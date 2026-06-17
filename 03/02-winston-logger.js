 const winston = require("winston");

// // 로거 만들기
// const logger = winston.createLogger({
//     level: "info",
//     format: winston.format.simple(),    //간단한 테스트 형식
//     transports: [                       //로거에 대한 출력 방향 설정
//         new winston.transports.Console(),   //콘솔 출력
//         new winston.transports.File({       //파일 app.log에 출력
//             filename: 'app.log'
//         })
//     ]
// });

// console.log("로깅 시작");

// //에러
// logger.error("에러 발생 - 가장 중요한 에러 메시지");
// //경고
// logger.warn("경고 - 주의가 필요한 메시지");
// //정보
// logger.info("정보 - 일반적인 정보");
// //디버그
// logger.debug("디버그 - 개발 중에만 사용하는 메시지");

// console.log("로깅 끝");

const simpleLogger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}]: ${message}`
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File ({
            filename: 'simpleLogger.log'    // temp/sample.log 
        })
    ]
});

//impleLogger.info("타임스탬프가 포함된 로거");
//에러
simpleLogger.error("에러 발생 - 가장 중요한 에러 메시지");
//경고
simpleLogger.warn("경고 - 주의가 필요한 메시지");
//정보
simpleLogger.info("정보 - 일반적인 정보");
//디버그
simpleLogger.debug("디버그 - 개발 중에만 사용하는 메시지");