#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mapper.sqlx.j2 템플릿의 loop.parent.last 오류 수정 (간단한 방법)
"""

# 파일 경로
template_file = "C:/Users/naoek/.claude/skills/salime-codegen/templates/Mapper.sqlx.j2"

# 파일 읽기
with open(template_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# loop.parent.last를 포함하는 줄 찾아서 수정
modified = False
for i, line in enumerate(lines):
    if 'loop.parent.last' in line:
        print(f"Line {i+1}: {line.strip()}")
        # loop.parent.last를 제거하고 loop.last만 사용
        lines[i] = line.replace('{% if not loop.last or not loop.parent.last %},{% endif %}', '{% if not loop.last %},{% endif %}')
        modified = True
        print(f"Modified to: {lines[i].strip()}")

# 파일 저장
if modified:
    with open(template_file, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("\n[SUCCESS] Mapper.sqlx.j2 파일의 loop.parent.last 오류 수정 완료")
else:
    print("\n[INFO] loop.parent.last를 찾을 수 없습니다.")