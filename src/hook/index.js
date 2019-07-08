import moment from 'moment'

var currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
const period = { 
    'R1': [moment().format('YYYY-MM-DD ' + '09:00:00'), moment().format('YYYY-MM-DD ' + '11:00:00')], 
    'R2': [moment().format('YYYY-MM-DD ' + '13:00:00'), moment().format('YYYY-MM-DD ' + '15:00:00')], 
    'R3': [moment().format('YYYY-MM-DD ' + '15:30:00'), moment().format('YYYY-MM-DD ' + '20:00:00')]
}

export const checkPeriod = () => {		
    if(moment(currentTime).isBetween(moment(period.R1[0]), moment(period.R1[1])))
        return true;
    else if(moment(currentTime).isBetween(moment(period.R2[0]), moment(period.R2[1])))
        return true;
    else if(moment(currentTime).isBetween(moment(period.R3[0]), moment(period.R3[1])))
        return true
    else
        return false
}

export const checkPeriodTime = () => {		
    if(moment(currentTime).isBetween(moment(period.R1[0]), moment(period.R1[1])))
        return 'รอบที่ 1 (10:00 น.)';
    else if(moment(currentTime).isBetween(moment(period.R2[0]), moment(period.R2[1])))
        return 'รอบที่ 2 (14:00 น.)';
    else if(moment(currentTime).isBetween(moment(period.R3[0]), moment(period.R3[1])))
        return 'รอบที่3 (16:00 น.)'
    else
        return ''
}