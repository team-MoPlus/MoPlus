function parseISO8601DurationToSeconds(duration: string): number {
	const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
	const match = duration.match(regex);

	if (!match) throw new Error("Invalid ISO 8601 duration format");

	// 각 시간 요소를 추출하고, 없으면 0으로 설정
	const hours = parseInt(match[1] || "0", 10); // `H` 값이 없으면 0으로 설정
	const minutes = parseInt(match[2] || "0", 10); // `M` 값이 없으면 0으로 설정
	const seconds = parseInt(match[3] || "0", 10); // `S` 값이 없으면 0으로 설정

	// 총 초(second)로 변환
	return hours * 3600 + minutes * 60 + seconds;
}

export function calculateTimeDifference(
	averageTime: string,
	solvedTime: string
) {
	// 두 시간을 초 단위로 변환
	const time1InSeconds = parseISO8601DurationToSeconds(averageTime);
	const time2InSeconds = parseISO8601DurationToSeconds(solvedTime);

	// 두 시간의 차이 계산
	const differenceInSeconds = Math.abs(time1InSeconds - time2InSeconds);

	// 시간과 분으로 변환
	const differenceHours = Math.floor(differenceInSeconds / 3600);
	const differenceMinutes = Math.floor((differenceInSeconds % 3600) / 60);

	// 어느 시간이 더 빠른지 판별
	// const fasterDuration = time1InSeconds < time2InSeconds ? "d" : "Duration 2";

	if (time1InSeconds < time2InSeconds) {
		return [false, differenceHours, differenceMinutes];
	} else {
		return [true, differenceHours, differenceMinutes];
	}
	// return `${fasterDuration} is faster by ${differenceHours} hours and ${differenceMinutes} minutes.`;
}
