export default class Adapter {
  forList(rows) {
    return rows;
  }

  one(row) {
    if (row.createdAt) {
      row.createdAt = row.createdAt.toString();
    }

    if (row.updatedAt) {
      row.updatedAt = row.updatedAt.toString();
    }

    return row;
  }
}