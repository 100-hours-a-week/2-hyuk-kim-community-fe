module.exports = {
    apps: [
        {
            // 개발 환경
            name: 'front-dev',
            script: './app.js',
            instances: 1,
            autorestart: false,
            watch: true,
        },
        {
            // 배포 환경
            name: 'front-product',
            script: './app.js',
            instances: 1, // 어차피 프리티어라 1코어니까 cluster 말고 1코어로 실행하기
            autorestart: true,
            watch: false,
        },
    ],
};