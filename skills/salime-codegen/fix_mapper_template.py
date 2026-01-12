#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mapper.sqlx.j2 템플릿의 loop.parent.last 오류 수정
"""

import re

# 파일 경로
template_file = "C:/Users/naoek/.claude/skills/salime-codegen/templates/Mapper.sqlx.j2"

# 파일 읽기
with open(template_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 패턴 1: SELECT 쿼리의 detail_sections 루프 수정 (69번째 줄 부근)
pattern1 = r"""{% if detail_sections is defined and detail_sections\|length > 0 %}
{% set all_fields = \[\] %}
{% for column in grid_columns %}
{% set _ = all_fields\.append\(column\.field\) %}
{% endfor %}
{% for section in detail_sections %}
{% for field in section\.fields %}
{% if field\.field not in all_fields %}
{% set _ = all_fields\.append\(field\.field\) %}
               \{\{ field\.field }}\{% if not loop\.last or not loop\.parent\.last %\},\{% endif %\}\{\{ ' ' \* \(20 - field\.field\|length\) }}\}/\* \{\{ field\.label }} \*/
{% endif %}
{% endfor %}
{% endfor %}
{% endif %}"""

replacement1 = """{% if detail_sections is defined and detail_sections|length > 0 %}
{% set all_fields = [] %}
{% for column in grid_columns %}
{% set _ = all_fields.append(column.field) %}
{% endfor %}
{% set detail_fields = [] %}
{% for section in detail_sections %}
{% for field in section.fields %}
{% if field.field not in all_fields %}
{% set _ = detail_fields.append(field) %}
{% set _ = all_fields.append(field.field) %}
{% endif %}
{% endfor %}
{% endfor %}
{% for field in detail_fields %}
               {{ field.field }}{% if not loop.last %},{% endif %}{{ ' ' * (20 - field.field|length) }}/* {{ field.label }} */
{% endfor %}
{% endif %}"""

# 패턴 2: INSERT 쿼리의 detail_sections 루프 수정 (116번째 줄 부근)
pattern2 = r"""{% if detail_sections is defined and detail_sections\|length > 0 %}
{% set all_fields = \[\] %}
{% for column in grid_columns %}
{% set _ = all_fields\.append\(column\.field\) %}
{% endfor %}
{% for section in detail_sections %}
{% for field in section\.fields %}
{% if field\.field not in all_fields %}
{% set _ = all_fields\.append\(field\.field\) %}
            \{\{ field\.field }}\{% if not loop\.last or not loop\.parent\.last %\},\{% endif %}

{% endif %}
{% endfor %}
{% endfor %}
{% endif %}"""

replacement2 = """{% if detail_sections is defined and detail_sections|length > 0 %}
{% set all_fields = [] %}
{% for column in grid_columns %}
{% set _ = all_fields.append(column.field) %}
{% endfor %}
{% set detail_fields = [] %}
{% for section in detail_sections %}
{% for field in section.fields %}
{% if field.field not in all_fields %}
{% set _ = detail_fields.append(field) %}
{% set _ = all_fields.append(field.field) %}
{% endif %}
{% endfor %}
{% endfor %}
{% for field in detail_fields %}
            {{ field.field }}{% if not loop.last %},{% endif %}

{% endfor %}
{% endif %}"""

# 패턴 3: VALUES의 detail_sections 루프 수정 (136번째 줄 부근)
pattern3 = r"""{% if detail_sections is defined and detail_sections\|length > 0 %}
{% set all_fields = \[\] %}
{% for column in grid_columns %}
{% set _ = all_fields\.append\(column\.field\) %}
{% endfor %}
{% for section in detail_sections %}
{% for field in section\.fields %}
{% if field\.field not in all_fields %}
{% set _ = all_fields\.append\(field\.field\) %}
            #\{\{'{'}}{{ field\.field }}\{{'}'}}}\{% if not loop\.last or not loop\.parent\.last %\},\{% endif %}

{% endif %}
{% endfor %}
{% endfor %}
{% endif %}"""

replacement3 = """{% if detail_sections is defined and detail_sections|length > 0 %}
{% set all_fields = [] %}
{% for column in grid_columns %}
{% set _ = all_fields.append(column.field) %}
{% endfor %}
{% set detail_fields = [] %}
{% for section in detail_sections %}
{% for field in section.fields %}
{% if field.field not in all_fields %}
{% set _ = detail_fields.append(field) %}
{% set _ = all_fields.append(field.field) %}
{% endif %}
{% endfor %}
{% endfor %}
{% for field in detail_fields %}
            #{{'{'}}{{ field.field }}{{'}}'}}{% if not loop.last %},{% endif %}

{% endfor %}
{% endif %}"""

# 패턴 4: UPDATE의 detail_sections 루프 수정 (165번째 줄 부근)
pattern4 = r"""{% if detail_sections is defined and detail_sections\|length > 0 %}
{% set all_fields = \[\] %}
{% for column in grid_columns %}
{% set _ = all_fields\.append\(column\.field\) %}
{% endfor %}
{% for section in detail_sections %}
{% for field in section\.fields %}
{% if field\.field not in all_fields %}
{% set _ = all_fields\.append\(field\.field\) %}
               \{\{ field\.field }} = #\{\{'{'}}{{ field\.field }}\{{'}'}}}\{% if not loop\.last or not loop\.parent\.last %\},\{% endif %}

{% endif %}
{% endfor %}
{% endfor %}
{% endif %}"""

replacement4 = """{% if detail_sections is defined and detail_sections|length > 0 %}
{% set all_fields = [] %}
{% for column in grid_columns %}
{% set _ = all_fields.append(column.field) %}
{% endfor %}
{% set detail_fields = [] %}
{% for section in detail_sections %}
{% for field in section.fields %}
{% if field.field not in all_fields %}
{% set _ = detail_fields.append(field) %}
{% set _ = all_fields.append(field.field) %}
{% endif %}
{% endfor %}
{% endfor %}
{% for field in detail_fields %}
               {{ field.field }} = #{{'{'}}{{ field.field }}{{'}}'}}{% if not loop.last %},{% endif %}

{% endfor %}
{% endif %}"""

# 정규식 적용
content = re.sub(pattern1, replacement1, content, flags=re.MULTILINE)
content = re.sub(pattern2, replacement2, content, flags=re.MULTILINE)
content = re.sub(pattern3, replacement3, content, flags=re.MULTILINE)
content = re.sub(pattern4, replacement4, content, flags=re.MULTILINE)

# 파일 저장
with open(template_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("[SUCCESS] Mapper.sqlx.j2 파일의 loop.parent.last 오류 수정 완료")