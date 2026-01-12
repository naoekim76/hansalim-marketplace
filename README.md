# HSLIM Marketplace

한살림 통합정보시스템(HSLIM2) 개발팀 공유 도구 및 스킬 마켓플레이스입니다.

## 🎯 목적

HSLIM2 프로젝트 개발에 필요한 Claude Code 스킬과 플러그인을 팀원들과 공유하기 위한 중앙 저장소입니다.

## 📦 포함된 플러그인

### 1. hslim-plugin
**HSLIM2 개발 도구 모음**

#### 포함 스킬:
- **salime-codegen**: HSLIM2 화면 5-파일 구조 자동 생성
- **salime-auigrid**: AUIGrid 그리드 라이브러리 사용법 및 코드 수정 지원


## 🚀 설치 및 사용 방법

### 1단계: Marketplace 추가
```bash
/plugin marketplace add naoekim76/hanslim-marketplace
```

### 2단계: skill 설치
```bash
# 전체 플러그인 설치
/plugin install salime-skills@hansalim-agent-skills

```

### 사용 예시
```
# 코드 생성
"살림이 화면 개발해줘"
"HSLIM2 신규 화면 생성해줘"

# AUIGrid 지원
"그리드 컬럼 설정 방법 알려줘"
"AUIGrid 이벤트 처리 어떻게 해?"
```

## 📁 디렉토리 구조

```
hslim-marketplace/
├── .claude-plugin/
│   └── marketplace.json      # 마켓플레이스 설정
│   └── skills/
│       ├── salime-codegen/
│       └── salime-auigrid/
└── README.md
```

## 🔄 업데이트

새로운 스킬이나 플러그인이 추가되면 자동으로 업데이트됩니다.

```bash
# 최신 버전으로 업데이트
/plugin update hslim-plugin@hslim-marketplace
```

## 📋 버전 관리

- **v1.0.0**: 초기 릴리스
  - salime-codegen: HSLIM2 코드 생성
  - salime-auigrid: AUIGrid 지원

## 🛠 기술 스택

- **Claude Code**: AI 기반 개발 도구
- **HSLIM2**: 한살림 통합정보시스템
- **Spring Framework**: 백엔드 프레임워크
- **AUIGrid**: 상용 그리드 라이브러리

## 📧 문의

- **팀**: 한살림시스템 개발팀
- **이메일**: tomcat@hansalim.or.kr
- **저장소**: https://github.com/naoekim76/hslim-marketplace

## 📝 라이선스

MIT License

---

**Made with ❤️ by tomcat**
