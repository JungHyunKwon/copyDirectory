/**
 * @names copyDirectory
 * @author JungHyunKwon
 * @since 2019-09-05
 */

'use strict';

const fse = require('fs-extra'), // {@link https://github.com/jprichardson/node-fs-extra}
	  readline = require('readline'),
	  rl = readline.createInterface({
	      input : process.stdin,
		  output : process.stdout
	  });

//질문
rl.question('경로 : ', directory => {
	//값이 있을 때
	if(directory) {
		rl.question('저장 경로 : ', baseDirectory => {
			//값이 있을 때
			if(baseDirectory) {
				console.log('\n쉼표로 구분할 수 있습니다.\n');

				rl.question('이름 : ', names => {
					//값이 있을 때
					if(names) {
						names = names.split(',');

						let namesLength = names.length;

						(function loopNames(index) {
							//이름 개수만큼 반복
							if(namesLength > index) {
								let saveDirectory = baseDirectory + '/' + names[index];

								fse.copy(directory, saveDirectory, err => {
									//오류가 있을 때
									if(err) {
										console.error(saveDirectory + '에 복사하지 못했습니다.');
									}else{
										console.log(saveDirectory + '에 복사하였습니다.');
									}

									loopNames(index + 1);
								});
							}else{
								rl.close();
							}
						})(0);
					}else{
						console.error('이름을 입력해주세요');

						rl.close();
					}
				});
			}else{
				console.error('저장 경로를 입력해주세요');

				rl.close();	
			}
		});
	}else{
		console.error('경로를 입력해주세요');

		rl.close();
	}
});