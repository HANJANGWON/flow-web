## Built with

### Front-end

- `React`
- `Typescript`
- `Apollo Client`
- `GraphQL Code Generator`
- `Styled Components`

### Back-end

- `NodeJS`
- `Apollo Server`
- `GraphQL`
- `PostgreSQL`
- `Prisma`

### Deploy

- `Netlify`
- `Heroku`

## Project

> 1. 고정확장자, 커스텀 확장자

- 고정확장자 체크박스를 클릭하거나, 커스텀 확장자를 입력하면 데이터베이스에 등록됩니다.
- 체크박스를 해제하거나, 커스텀 확장자를 삭제하면 데이터베이스에서 삭제됩니다.
- 커스텀 확장자를 삭제하게 되면, `Apollo Client`를 통해 캐시된 필드 값을 직접 수정하여 목록을 업데이트합니다.
- 입력한 커스텀 확장자가 고정 확장자 또는 커스텀 확장자 목록에 이미 존재하면 추가할 수 없습니다.
- 파일을 업로드하면 확장자를 검사하고 체크박스에 표시된 확장자 또는 커스텀 확장자에 해당할 경우 경고메세지를 출력합니다.

> 2. 다크모드

- 해와 달 아이콘을 클릭하여 라이트 모드와 다크 모드로 설정할 수 있습니다.
- `Styled Components ThemeProvider`를 이용하여 라이트 테마와 다크 테마를 설정합니다.
- 모드 전환 시, 활성 상태를 로컬 스토리지에 저장하고, `Apollo Client Reactive variables`를 사용하여 local state를 업데이트합니다.

> 3. 베포

- `Front-end` -> `Netlify`
- `Back-end` -> `Heroku`
- `Database` -> `Heroku PostgreSQL`

> 4. git

- `Front-end` -> https://github.com/HANJANGWON/flow-web
- `Back-end` -> https://github.com/HANJANGWON/flow
