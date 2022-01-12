const autoScroll = async (page) => {
   await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
         var totalHeight = 0;
         var distance = 100;

         const interval = 100;
         const pause = 3000;

         var timer = setInterval(async () => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {

               // time to download new data
               await promisifyTimeout(pause);

               if (totalHeight >= scrollHeight) {
                  clearInterval(timer);
                  resolve();
               }
            }

         }, interval);

         const promisifyTimeout = (ms) => {
            return new Promise((resolve, reject) => {
               setTimeout(() => {
                  resolve();
               }, ms)
            });
         }
      });
   });
}

module.exports = autoScroll