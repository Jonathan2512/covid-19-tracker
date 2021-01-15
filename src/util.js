import numeral from 'numeral';
export const sortData = (data) => {
    const sortedData = [...data];
    // sort decreasingly
    sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
    { /*
        if (a.cases > (or <) b.cases) {
            return -1; //bieu thuc so sanh tra ve nho hon 0, ham sort xep a len truoc;
        } else { 
            return 1; // bieu thuc so sanh tra ve lon hon 0, ham sort xep b len truoc;
        }
    */}
    return sortedData;
}

export const prettyPrintStat = (stat) => (
    stat ? `+${numeral(stat).format("0.0a")}` : '+0'
)

