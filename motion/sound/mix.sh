#!/bin/bash
# 소리 큐 표(motion.md 6장)대로 효과음을 30초 트랙 하나로 합침
set -e
D="$(cd "$(dirname "$0")" && pwd)"
# 시각(초) 파일 음량(dB)
CUES="0.0 whoosh06 -8
0.74 bounce1 -2
0.92 bounce2 -2
1.6 ding -4
3.7 key1 -2
3.9 key2 -2
4.1 key3 -2
4.3 key4 -2
5.6 tap 0
6.0 chime_up 0
6.5 key1 -2
6.7 key2 -2
6.9 key3 -2
7.1 key_space -2
7.3 key4 -2
7.5 key1 -2
8.0 tap 0
10.4 ding -4
14.0 chime_small 0
14.5 tap 0
15.0 pop 0
17.8 tap 0
18.1 whoosh07 -3
19.6 success 0
23.4 whoosh06 -3
23.4 chime_up -3
24.0 sparkle -2
25.2 tok1 0
25.5 tok2 0
25.7 tok3 0
26.1 accent 0"
args=(); fl=""; i=0
while read -r t f g; do
  args+=(-i "$D/sfx/$f.wav")
  ms=$(awk "BEGIN{printf \"%d\", $t*1000}")
  fl+="[$i]volume=${g}dB,adelay=${ms}|${ms}[a$i];"
  i=$((i+1))
done <<< "$CUES"
for ((k=0;k<i;k++)); do fl+="[a$k]"; done
fl+="amix=inputs=$i:normalize=0:dropout_transition=0,apad=whole_dur=30,atrim=0:30,alimiter=limit=0.89[out]"
ffmpeg -v error -y "${args[@]}" -filter_complex "$fl" -map "[out]" -ar 48000 "$D/sound_30s.wav"
ffmpeg -v error -y -i "$D/sound_30s.wav" -c:a aac -b:a 192k "$D/sound_30s.m4a"
echo "mixed $i cues"
