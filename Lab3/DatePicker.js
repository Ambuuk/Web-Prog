'use strict';

class DatePicker{
    constructor(id,callback){
        this.id = id;
        this.callback = callback;
    }
    render(date){
        // Calendar uusgeed div-id ruugaa butsaana
        var parent = document.getElementById(this.id);
        parent.appendChild(this.createCalender(date));
    }
    createCalender(date){
        // 1. Calendariin husnegt uusgeh
        var table = document.createElement("table");
        // 2. Sariin header uusgeh
        var header = this.createCalenderHeader(table, date);
        // 3. Garigiin nernuudiig ogoh
        var daysOfWeek = ["Su", "Mo","Tu","We","Th","Fr","Sa"];
        var rowWeek = header.insertRow(1);
        for (var i = 0; i < 7; ++ i) {
            var cell=rowWeek.insertCell(i);
            cell.innerHTML=daysOfWeek[i];
        }
        // 4. Odruudiig tohiruulah
        var firstDay = new Date(date.getFullYear(), date.getMonth(),1);
        //console.log(firstDay.getDay());
        var curDate = firstDay;
        curDate.setDate(-firstDay.getDay()+1);
        var rowIndex = 2;
        while (true) {
            var row = table.insertRow(rowIndex);
            rowIndex++;
            for (i = 0; i < 7; ++ i) {
                var cell = row.insertCell(i);
                cell.innerHTML = curDate.getDate();
                if (curDate.getMonth() === date.getMonth()) {
                    cell.setAttribute("id", "CurMonth");
                        let ob = {
                            month: curDate.getMonth() + 1,
                            day: cell.innerHTML,
                            year: curDate.getFullYear()
                        };
                    cell.addEventListener("click", () => {
                        this.callback(this.id, ob);
                    });
                } else {
                    cell.setAttribute("id", "OtherMonth");
                }

                curDate.setDate(curDate.getDate() + 1);
            }
            if (curDate.getMonth() !== date.getMonth()) {
                break;
            }
        }
        return table;
    }

    createCalenderHeader(table, date) {
        var header = table.createTHead();
        var headerRow = header.insertRow(0);

        var leftArrowCell = headerRow.insertCell(0);
        leftArrowCell.innerHTML = "<";
        leftArrowCell.setAttribute("id", "LeftArrow");
        
        var monthCell = headerRow.insertCell(1);
        var months = ["January", "February","March", "April","May", "June", "July", "August", "September",
        "October","November","December"];
        monthCell.innerHTML = months[date.getMonth()] + "   " + date.getFullYear();
        monthCell.colSpan = "5";

        var rightArrowCell = headerRow.insertCell(2);
        rightArrowCell.innerHTML = ">";
        rightArrowCell.setAttribute("id", "RightArrow");
        // click event
        leftArrowCell.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() - 1);
            this.render(date);
        });

        rightArrowCell.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() + 1);
            this.render(date);
        });
        return header;
    }
}