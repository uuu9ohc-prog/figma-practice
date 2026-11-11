#!/bin/bash
# 효과음을 수식으로 직접 합성 (녹음·외부 음원 없음)
set -e
O="$(cd "$(dirname "$0")" && pwd)/sfx"
gen() { # $1=파일 $2=길이 $3=수식 $4=추가필터
  ffmpeg -v error -y -f lavfi -i "aevalsrc=exprs='$3':s=48000:d=$2" -af "${4:-anull},aformat=channel_layouts=stereo" "$O/$1.wav"
}
P='2*PI'
# 키보드 입력음: 눌림 딸깍 + 25ms 뒤 작은 놓임 딸깍
key() { gen "$1" 0.09 "((random(0)*2-1)*exp(-t*140)*0.55+sin($P*$2*t)*exp(-t*320)*0.35)+if(gte(t,0.028),(random(1)*2-1)*exp(-(t-0.028)*220)*0.22,0)" "highpass=f=700,lowpass=f=9000"; }
key key1 2300; key key2 2600; key key3 2050; key key4 2450
# 스페이스바: 조금 낮고 두꺼운 소리
gen key_space 0.11 "(random(0)*2-1)*exp(-t*110)*0.5+sin($P*900*t)*exp(-t*160)*0.4" "highpass=f=300,lowpass=f=6000"
# 탭(누름): 짧은 '톡'
gen tap 0.12 "sin($P*(700+500*exp(-t*60))*t)*exp(-t*45)*0.7+(random(0)*2-1)*exp(-t*400)*0.15" "lowpass=f=6000"
# 짧은 알림음: 맑은 종소리 (E6)
gen ding 0.6 "(sin($P*1318.5*t)*0.5+sin($P*2637*t)*0.15*exp(-t*6))*exp(-t*7)*(1-exp(-t*600))"
# 팝업 등장음: 음높이가 올라가는 '뿅'
gen pop 0.18 "sin($P*(420*t+2600*t*t))*exp(-t*22)*0.65*(1-exp(-t*800))"
# 바람 소리(휙): 소리가 커졌다 작아지는 걸러진 잡음
whoosh() { gen "$1" "$2" "(random(0)*2-1)*sin(PI*t/$2)^2*0.9" "bandpass=f=1400:width_type=o:w=2.2,lowpass=f=5000"; }
whoosh whoosh07 0.7; whoosh whoosh06 0.6
# 경쾌한 전환음: 도-미-솔 빠르게 올라감 (C6 E6 G6)
note() { echo "if(gte(t,$2),(sin($P*$1*(t-$2))*0.42+sin($P*$1*2*(t-$2))*0.1)*exp(-(t-$2)*9)*(1-exp(-(t-$2)*700)),0)"; }
gen chime_up 0.75 "$(note 1046.5 0)+$(note 1318.5 0.07)+$(note 1568 0.14)"
# 가벼운 전환음: 솔-도 2음 (S2→S3)
gen chime_small 0.6 "($(note 1568 0)+$(note 2093 0.08))*0.7"
# 완료 효과음: 2음 상승 (G5 → C6), 조금 길게
note2() { echo "if(gte(t,$2),(sin($P*$1*(t-$2))*0.45+sin($P*$1*3*(t-$2))*0.06)*exp(-(t-$2)*4.5)*(1-exp(-(t-$2)*500)),0)"; }
gen success 1.0 "$(note2 784 0)+$(note2 1046.5 0.12)"
# S5 단어 톡: 음이 하나씩 올라감
gen tok1 0.15 "sin($P*880*t)*exp(-t*35)*0.55*(1-exp(-t*900))"
gen tok2 0.15 "sin($P*988*t)*exp(-t*35)*0.55*(1-exp(-t*900))"
gen tok3 0.15 "sin($P*1175*t)*exp(-t*35)*0.55*(1-exp(-t*900))"
# 강조음: 도-미-솔-도 화음 (예약 끝.)
ch() { echo "sin($P*$1*t)"; }
gen accent 1.4 "($(ch 523.25)+$(ch 659.25)+$(ch 784)+$(ch 1046.5)*0.7)*0.17*exp(-t*2.6)*(1-exp(-t*300))"
# S1 통통 튀는 소리: 고무공처럼 음이 짧게 올라가는 '통' (두 번째는 조금 높고 작게)
gen bounce1 0.16 "sin($P*(260*t+1400*t*t))*exp(-t*28)*0.75*(1-exp(-t*900))" "lowpass=f=4000"
gen bounce2 0.13 "sin($P*(330*t+1700*t*t))*exp(-t*34)*0.55*(1-exp(-t*900))" "lowpass=f=4000"
# S5 반짝 소리: 별 6개가 0.06초 간격으로 나타날 때마다 높은 '띵' (E7 G7 A7 F7 B7 C8)
spark() { echo "if(gte(t,$2),sin($P*$1*(t-$2))*exp(-(t-$2)*18)*0.22*(1-exp(-(t-$2)*900)),0)"; }
gen sparkle 0.8 "$(spark 2637 0)+$(spark 3136 0.06)+$(spark 3520 0.12)+$(spark 2794 0.18)+$(spark 3951 0.24)+$(spark 4186 0.30)"
echo done
