module.exports = (array, quantity) => {
   let i = 0;

   const dividedArray = [];

   while (i < array.length) {

      if (i + quantity > array.length) {
         const items = array.slice(i)

         dividedArray.push(items)
      }

      const items = array.slice(i, i + quantity);
      dividedArray.push(items);

      i += quantity;
   }

   return dividedArray;
};