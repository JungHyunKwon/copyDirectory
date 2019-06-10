/**
 * @names copyDirectory
 * @author JungHyunKwon
 * @since 2019-09-05
 */

'use strict';

const fs = require('fs-extra'), // {@link https://github.com/jprichardson/node-fs-extra}
	  filenamify = require('filenamify'), // {@link https://github.com/sindresorhus/filenamify}
	  readline = require('readline'),
	  rl = readline.createInterface({
	      input : process.stdin,
		  output : process.stdout
	  });

/**
 * @param {obejct} options {
       directory : string,
	   saveDirectory : string,
	   names : array
   }
   @param {function} callback {array}
 * @since 2018-09-05
 */
function copyDirectory(options, callback) {
	let callbackIsFunction = typeof callback === 'function',
		result = [];

	//객체일 때
	if(options) {
		let names = options.names;
		
		//배열일 때
		if(Array.isArray(names)) {
			let directory = options.directory,
				saveDirectory = options.saveDirectory,
				namesLength = names.length;

			(function loopNames(index) {
				//이름 개수만큼 반복
				if(namesLength > index) {
					let nameDirectory = saveDirectory + '/' + filenamify(names[index], {
						replacement : ''
					});

					fs.copy(directory, nameDirectory, err => {
						result.push({
							directory : directory,
							saveDirectory : nameDirectory,
							isSaved : (err) ? false : true //오류가 있을 때
						});

						loopNames(index + 1);
					});

				//함수일 때
				}else if(callbackIsFunction) {
					callback(result);
				}
			})(0);

		//함수일 때
		}else if(callbackIsFunction) {
			callback(result);
		}
	
	//함수일 때
	}else if(callbackIsFunction) {
		callback(result);
	}
}

//질문
rl.question('경로 : ', directory => {
	//값이 있을 때
	if(directory) {
		rl.question('저장 경로 : ', saveDirectory => {
			//값이 있을 때
			if(saveDirectory) {
				console.log('\n쉼표로 구분할 수 있습니다.\n');

				rl.question('이름 : ', names => {
					//값이 있을 때
					if(names) {
						copyDirectory({
							directory : directory,
							saveDirectory : saveDirectory,
							names : names.split(',')
						}, result => {
							result.forEach((value, index, arraay) => {
								let nameDirectory = value.saveDirectory;

								//저장했을 때
								if(value.isSaved) {
									console.log(nameDirectory + '에 복사하였습니다.');
								}else{
									console.error(nameDirectory + '에 복사하지 못했습니다.');
								}
							});
							
							console.log('작업을 완료하였습니다.');
						});
					}else{
						console.error('이름을 입력해주세요');
					}

					rl.close();
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