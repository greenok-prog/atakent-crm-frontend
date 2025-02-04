export function formatExhibitionDate(date:Date, isStart:boolean = true):String {
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
   
    if(isStart){
        return `${day} ${month} 10:00`;
    }else{
        return `${day} ${month} 16:00`;
    }
    
}