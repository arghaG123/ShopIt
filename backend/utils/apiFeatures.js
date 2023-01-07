class APIFeatures {
   constructor(query,queryStr){
      this.query = query;
      this.queryStr = queryStr;
   }

   search(){
      const keyword = this.queryStr.keyword ? {
         name:{
            $regex: this.queryStr.keyword,
            $options: "i"
         }
      }:{};
      //console.log(keyword)
      this.query = this.query.find({...keyword});
      return this;
   }

   filters(){
      const queryCopy = {...this.queryStr};

      //Removing fields from the query
      const removeFields = ['keyword', 'limit', 'page'];
      removeFields.forEach((field) => delete queryCopy[field]);
      // Advance filters like price,rating etc.
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match => `$${match}`)
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
   }

   pagination(productPerPage){
      const currentPage = Number(this.queryStr.page) || 1;
      const skip = productPerPage * (currentPage -1);

      this.query = this.query.limit(productPerPage).skip(skip);

      return this;
   }

}

module.exports = APIFeatures;