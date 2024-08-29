const ChangeText = (text, idText) => {
   // console.log(width);
   let str;
   if (idText === 'title') {
      str = text.split(' ');
      if (str.length > 5) {
         return `${str.slice(0, 5).join(' ')}...`;
      }
   }
   if (idText === 'overview') {
      if (!text.length) {
         return 'Описание отсутствует';
      }

      str = text.split(' ');

      if (str.length > 20) {
         return `${str.slice(0, 12).join(' ')}...`;
      }
   }
   return text;
};

export default ChangeText;
