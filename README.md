# copyDitectory v1.0.0
NodeJS로 만들었으며 디렉토리를 복사하여 지정한 경로에 지정한 이름으로 붙여 넣습니다.

### 매개변수

이름 | 형태 | 설명
| :-- | :-- | :-- |
path | string | 경로
savePath | string | 저장 경로
saveName | array \|\| string | 저장할 이름

## CLI
````javascript
node copyDirectory
````
저장할 이름은 콤마(,)로 구분할 수 있습니다.