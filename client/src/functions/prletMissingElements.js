export default function prletMissingElements(array, arrayLength){
    let missing_number;           
   // Initialize diff
   let diff = array[0] - 0;
   let finishArray=[];
   for(let i = 0; i < arrayLength; i++){

       // Check if diff and array[i]-i
       // both are equal or not
       if (array[i] - i !== diff){

           // Loop for consecutive
           // missing elements
           while (diff < array[i] - i)
           {
               missing_number= i + diff;
               finishArray.push(missing_number.toString())
               diff++;
           }
       }
   }
   let allHours = array.concat(finishArray);
   allHours.sort((a,b) => a-b);

   let booking_hour = [];

   while(allHours.length > 1){
       booking_hour.push(allHours[0]+"-"+allHours[1]);
       allHours.shift();
   };

   return booking_hour;
}

