#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
한살림 통합정보 시스템 코드 생성 스크립트
Type1/Type2 템플릿 기반 자동 코드 생성 도구
"""

import os
import sys
import json
from datetime import datetime
from pathlib import Path
from jinja2 import Environment, FileSystemLoader

# Windows 콘솔 인코딩 설정
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

# 기본 경로 설정
SCRIPT_DIR = Path(__file__).parent
TEMPLATE_DIR = SCRIPT_DIR / "templates"
# 현재 작업 디렉토리를 프로젝트 루트로 사용 (환경 변수로 오버라이드 가능)
PROJECT_ROOT = Path(os.getenv('SALIME_PROJECT_ROOT', os.getcwd()))

def generate_code(config):
    """
    설정을 기반으로 5개 파일 생성

    Args:
        config (dict): 코드 생성 설정
            - business_module: 업무 모듈 (예: hr)
            - screen_id: 화면 ID (예: HROrgInfo)
            - sub_module: 하위 모듈 (예: co)
            - screen_title: 화면 제목 (예: 부서조회)
            - ui_type: UI 유형 (예: Type 1)
            - reference_screen: 참조 화면 ID
            - tables: 관련 테이블 리스트
            - grid_columns: 그리드 컬럼 정보 [{field, header, width, align, dataType}]
            - search_fields: 검색 조건 [{field, label, type}]
    """

    # Jinja2 환경 설정
    env = Environment(
        loader=FileSystemLoader(str(TEMPLATE_DIR)),
        trim_blocks=True,
        lstrip_blocks=True
    )

    # UI Type 정규화 (대소문자 무관)
    ui_type = config.get('ui_type', 'type1').lower()
    if ui_type not in ['type1', 'type2', 'type3']:
        ui_type = 'type1'

    # 공통 컨텍스트
    context = {
        'business_module': config['business_module'],
        'business_module_upper': config['business_module'].upper(),
        'screen_id': config['screen_id'],
        'sub_module': config['sub_module'],
        'screen_title': config['screen_title'],
        'ui_type': ui_type,
        'crud_type': config.get('crud_type', 'R'),  # 기본값: R (조회만)
        'reference_screen': config.get('reference_screen', ''),
        'tables': config.get('tables', []),
        'grid_columns': config.get('grid_columns', []),
        'search_fields': config.get('search_fields', []),
        'author': config.get('author', 'Claude Code'),
        'date': datetime.now().strftime('%Y.%m.%d'),
        'year': datetime.now().year,
        # Type2/Type3 공통 파라미터
        'layout_type': config.get('layout_type', 'horizontal'),
        'master_grid_flex': config.get('master_grid_flex', 'flex-one'),
        'detail_form_flex': config.get('detail_form_flex', 'flex-two'),
        'detail_sections': config.get('detail_sections', []),
        'detail_grid_columns': config.get('detail_grid_columns', []),
        'detail_crud_enabled': config.get('detail_crud_enabled', False)
    }

    # 생성 결과
    results = {
        'success': True,
        'files': [],
        'errors': []
    }

    try:
        # 1. Controller 생성
        controller_path = generate_controller(env, context)
        results['files'].append(controller_path)

        # 2. Service 생성
        service_path = generate_service(env, context)
        results['files'].append(service_path)

        # 3. JSP View 생성
        jsp_path = generate_jsp(env, context)
        results['files'].append(jsp_path)

        # 4. JavaScript 생성
        js_path = generate_javascript(env, context)
        results['files'].append(js_path)

        # 5. MyBatis SQL 생성
        sql_path = generate_sql(env, context)
        results['files'].append(sql_path)

        print(f"[SUCCESS] 코드 생성 완료: {config['screen_id']}")
        print(f"생성된 파일: {len(results['files'])}개")
        for file_path in results['files']:
            print(f"  - {file_path}")

    except Exception as e:
        results['success'] = False
        results['errors'].append(str(e))
        print(f"[ERROR] 오류 발생: {e}")

    return results


def generate_controller(env, context):
    """Controller 파일 생성"""
    template = env.get_template('Controller.java.j2')
    content = template.render(context)

    file_path = PROJECT_ROOT / "hslim2-svc-portal/src/main/java/hslim2/portal/func" / \
                context['business_module'] / context['sub_module'] / "controller" / \
                f"{context['screen_id']}Controller.java"

    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(content, encoding='utf-8')

    return str(file_path)


def generate_service(env, context):
    """Service 파일 생성"""
    template = env.get_template('Service.java.j2')
    content = template.render(context)

    file_path = PROJECT_ROOT / "hslim2-svc-portal/src/main/java/hslim2/portal/func" / \
                context['business_module'] / context['sub_module'] / "service" / \
                f"{context['screen_id']}Service.java"

    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(content, encoding='utf-8')

    return str(file_path)


def generate_jsp(env, context):
    """JSP View 파일 생성 (UI Type에 따라 템플릿 선택)"""
    ui_type = context['ui_type']
    
    # UI Type에 따른 템플릿 선택
    if ui_type == 'type2':
        template = env.get_template('type2/View.jsp.j2')
    elif ui_type == 'type3':
        template = env.get_template('type3/View.jsp.j2')
    else:
        template = env.get_template('type1/View.jsp.j2')
    
    content = template.render(context)

    file_path = PROJECT_ROOT / "hslim2-svc-portal/src/main/resources/META-INF/resources/WEB-INF/jsp/portal" / \
                context['business_module'] / context['sub_module'] / \
                f"{context['screen_id']}.jsp"

    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(content, encoding='utf-8')

    return str(file_path)


def generate_javascript(env, context):
    """JavaScript 파일 생성 (UI Type에 따라 템플릿 선택)"""
    ui_type = context['ui_type']
    
    # UI Type에 따른 템플릿 선택
    if ui_type == 'type2':
        template = env.get_template('type2/Script.js.j2')
    elif ui_type == 'type3':
        template = env.get_template('type3/Script.js.j2')
    else:
        template = env.get_template('type1/Script.js.j2')
    
    content = template.render(context)

    file_path = PROJECT_ROOT / "hslim2-svc-portal/src/main/resources/static" / \
                context['business_module'] / context['sub_module'] / \
                f"{context['screen_id']}.js"

    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(content, encoding='utf-8')

    return str(file_path)


def generate_sql(env, context):
    """MyBatis SQL 파일 생성"""
    template = env.get_template('Mapper.sqlx.j2')
    content = template.render(context)

    file_path = PROJECT_ROOT / "hslim2-svc-portal/src/main/resources/mybatis/func" / \
                context['business_module'] / context['sub_module'] / \
                f"{context['screen_id']}Service.sqlx"

    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(content, encoding='utf-8')

    return str(file_path)


def main():
    """메인 함수"""
    if len(sys.argv) < 2:
        print("사용법: python generate_salime_code.py <config.json>")
        print("또는: python generate_salime_code.py '<json_string>'")
        sys.exit(1)

    # JSON 설정 파일 또는 문자열 읽기
    config_input = sys.argv[1]

    try:
        if config_input.startswith('{'):
            # JSON 문자열
            config = json.loads(config_input)
        else:
            # JSON 파일
            with open(config_input, 'r', encoding='utf-8') as f:
                config = json.load(f)

        # 코드 생성 실행
        results = generate_code(config)

        # 결과 출력
        if results['success']:
            sys.exit(0)
        else:
            sys.exit(1)

    except Exception as e:
        print(f"[ERROR] 설정 파일 오류: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()