module.exports = {
     format_date: (date) => {
         return `${date.getMonth() +1}/${date.getDate()}/${date.getFullYear()}`;
     },

     plural: (amount, word) => {
        
        if (amount !== 1 ) {
            return `${word}s`;
        }

        return word;
     }
}
