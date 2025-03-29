// 型安全なフェッチャー関数
export const fetcher = <T>(url: string): Promise<T> =>
  fetch(url).then((res) => {
    if (!res.ok) {
      const error = new Error('APIリクエストに失敗しました');
      throw error;
    }
    return res.json() 
  });
