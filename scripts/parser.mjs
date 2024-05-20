import cheerio from 'cheerio';
import fetch from 'node-fetch';

async function parseVolumes () {
  const URL = 'https://ilb.github.io/stockvaluation/securities.xhtml';

  const response = await fetch(URL, {});
  const htmlData = await response.text();

  const $ = cheerio.load(htmlData);

  const tableData = [];
  $('table tr').each((index, element) => {
    const row = {};
    const header = ["ticker", "value", "isin"];

    // del header
    if (index === 0) {
      return;
    }

    $(element).find('td p').each((i, el) => {

      if (i === 0) {
        row[header[0]] = $(el).text();
      } else if (i === 1) {
        row[header[1]] = parseInt($(el).text());
      } else if (i === 2) {
        row[header[2]] = $(el).text();
      }
    });
    tableData.push(row);
  });
  return tableData;
}

export default parseVolumes;