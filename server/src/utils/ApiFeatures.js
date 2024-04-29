class ApiFeatures {
  constructor(mongooseQuery, data) {
    this.data = data;
    this.mongooseQuery = mongooseQuery;
  }
  // pagination
  paginate() {
    let { page, size } = this.data;
    if (!page || page < 0) {
      page = 1;
    }
    if (!size || size < 0) {
      size = 10;
    }
    const skip = (+page - 1) * Number(size);
    this.mongooseQuery = this.mongooseQuery.limit(+size).skip(skip);
    return this;
  }
  // filtering
  filter() {
    // let excludeQuery = { ...this.data };
    // const includedQueries = ["page", "size", "sort", "fields", "search"];
    // includedQueries.forEach((e) => {
    //   delete excludeQuery[e];
    // });
    // const filter = JSON.stringify(excludeQuery).replaceAll(
    //   /(gt|gte|lte|lt|eq|in|nin|ne)/g,
    //   (match) => `$${match}`
    // );
    // this.mongooseQuery = this.mongooseQuery.find(JSON.parse(filter));
    // return this;
    const { page, size, sort, fields, search, ...filters } = this.data;

    const filterObj = { ...filters };

    // Convert filter values to MongoDB query operators
    for (const key in filterObj) {
      if (Object.hasOwnProperty.call(filterObj, key)) {
        // Check if the field is 'cityId' or 'title' for specific handling
        if (key === "cityId") {
          filterObj[key] = filterObj[key]; // Perform exact match on cityId
        } else if (key === "title") {
          filterObj[key] = { $regex: new RegExp(filterObj[key], "i") }; // Case-insensitive regex search on title
        } else {
          filterObj[key] = { $regex: new RegExp(filterObj[key], "i") }; // Case-insensitive regex search on other fields
        }
      }
    }

    this.mongooseQuery = this.mongooseQuery.find(filterObj);
    return this;
  }
  //sort
  sort() {
    if (this.data?.sort) {
      this.data.sort = this.data.sort.replaceAll(",", " ");
      this.mongooseQuery = this.mongooseQuery.sort(this.data.sort);
    }
    return this;
  }
  //fields
  fields() {
    if (this.data?.fields) {
      this.data.fields = this.data.fields.replaceAll(",", " ");
      this.mongooseQuery = this.mongooseQuery.select(this.data.fields);
    }
    return this;
  }
  //search
  search() {
    if (this.data?.search) {
      const searchRegex = new RegExp(this.data.search, "i"); // Case-insensitive search
      this.mongooseQuery = this.mongooseQuery.find({
        $or: [{ cityId: this.data.search }, { title: { $regex: searchRegex } }],
      });
    }
    return this;
  }
}
export default ApiFeatures;
