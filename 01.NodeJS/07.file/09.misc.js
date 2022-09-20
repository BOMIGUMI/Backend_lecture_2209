const fs = require('fs');

// 디렉토리에 있는 파일 목록 알아내기
fs.readdir('tmp', (err, files) => {
    console.log(files);

});

// 파일의 정보(stat) 알아내기
fs.stat('tmp/a.txt', (err, stats) => {
    console.log(stats.size);        // 파일의 크기
    console.log(stats.mtime);       // 최종수정시간
});

// 디렉토리에 있는 파일에 대하여 최종 수정시간, 파일의 크기, 파일 이름 표시
fs.readdir('tmp', (err, files) => {
    for (let file of files) {
        fs.stat('tmp/' + file, (err, stats) => {
            console.log(`${stats.mtime}\t${stats.size}\t${file}`);
        });
    }
});

// 파일 삭제하기 (unlink)
fs.unlink('tmp/textfile1.txt', err => {
    if (err)
        console.log(err);
});

// 파일 이름 변경(rename)하기
fs.rename('tmp/textfile.txt', 'tmp/텍스트파일.txt', err => {
    if (err)
        console.log(err);
});