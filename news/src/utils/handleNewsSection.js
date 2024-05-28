export default function chunkNewsList(newsList, size = 5) {
    return newsList.reduce((acc, val, i) => {
        if (i % size === 0) acc.push([]);
        acc[acc.length - 1].push(val);
        return acc;
    }, []);
}