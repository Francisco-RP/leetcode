#!/usr/bin/env bash

# Given a text file file.txt, transpose its content.

# You may assume that each row has the same number of columns, and each field is separated by the ' ' character.

# name age
# alice 21
# ryan 30

# becomes:

# name alice ryan
# age 21 30

RESULT=()

handleLine() {
  local INDEX=0
  for word in $1
  do
      # printf "%s\t%s\n" "$INDEX" "$word"
      RESULT["$INDEX"]="${RESULT["$INDEX"]} ${word}"
      (( INDEX++ )) || true
  done
}

input="./file.txt"

while read -r line || [ -n "$line" ]
do
  handleLine "$line"
done < "$input"

shopt -s extglob
for f in "${RESULT[@]}"
do
  printf '%s\n' "${f##+([[:space:]])}"
done
