export default function formatTime(createdAt: string): string {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000
  );

  const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

  if (diffInSeconds < 60) {
    return "방금 전";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, "minute"); // X분 전
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return rtf.format(-diffInHours, "hour"); // X시간 전
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return rtf.format(-diffInDays, "day"); // X일 전
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, "month"); // X개월 전
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return rtf.format(-diffInYears, "year"); // X년 전
}
