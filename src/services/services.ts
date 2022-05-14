
import axios from "axios";

const API_URL = "https://api.airtable.com/v0/";
class Service {
    async login(param: string) {
        //fetch  students records  once logged in
        try {
            const response = await axios.get(`${API_URL}${'app8ZbcPx7dkpOnP0'}/${'tblIzakozsIHPiZnI'}?api_key=keyt8qodDNgSh8bve&filterByFormula=({Name} ="${param}")`);
          // add student to a session
            localStorage.setItem("user", param);
            
          //get data from response and parse them to get required records
            let data = response.data
            let records = data.records;
            let record = records[0].fields;
            // get classes records

           // setTimeout(() => this.getClasses(record.Classes), 0)
            return this.getClasses(record.Classes);
        } catch (error) {
            console.error(error);
        }
    }

    async getClasses(classes: any) {
        // get query search params
        var queryString1 = Object.keys(classes).map(key => classes[key]).join(',');
        //fetch  classes records  once logged in
        try {
            const response = await axios.get(`${API_URL}${'app8ZbcPx7dkpOnP0'}/${'tblgh8YARZPqeJF07'}?api_key=keyt8qodDNgSh8bve&filterByFormula=SEARCH(RECORD_ID(), "${queryString1}") != ""`);
          
            //get data from response and parse them to get required records
            let data = response.data
            let records = data.records;
            //prepare classes record to get students
            let students: any = [];
            records.forEach((e: any) => {
                let record = e.fields;
                //console.log(record)
                var data = {
                    id: e.id,
                    class: record.Name,
                    students: record.Students,

                }
                students.push(data);

            });

             // get Students records
            return this.getStudents(students)

        } catch (error) {
            console.error(error);
        }

    }

    async getStudents(record: any) {
        //console.log(record)
     /// prepare data classes records to get student data
        let arr: any = []
        record.forEach((e: any) => {
            //console.log(e)
            let students = e.students;
            //console.log(students)
            var data = {
                students_list: students,
                class: e.class,
                id: e.id

            }
            arr.push(data)

        });

        let arr2: any[] = []
        arr.forEach((e: any) => {
            //console.log(e)
            let students = e.students_list;
            //console.log(students)
            arr2.push(students)

        });
       // get query search params
        var queryString = Object.keys(arr2).map((key: any) => arr2[key]).join(',');
       

        //fetch  students records by ids once logged in
        try {
            const response = await axios.get(`${API_URL}${'app8ZbcPx7dkpOnP0'}/${'tblIzakozsIHPiZnI'}?api_key=keyt8qodDNgSh8bve&filterByFormula=SEARCH(RECORD_ID(), "${queryString}") != ""`);
        //get data from response and parse them to get required records
            let data = response.data
            let records = data.records;
            let student: any[] = []
            // filter records to get students in each classess
            arr.forEach((el: any) => {
                let list: any[] = []
                el.students_list.forEach((res: any) => {
                    let results: any[] = [];
                    records.forEach((e: any) => {
                        let record = e.fields;
                        if (e.id.toString() === res.toString()) {
                    
                            let data = {
                                class: el.class,
                                student: record.Name
                            }
                            results.push(data);

                        }
                    });
                    list.push(results[0])

                });

                student.push(list)

            });
           //get students in classes and parse them to get students names
            var results = student.reduce((results, val,i) => {
                for (let index = 0; index < val.length; index++) {
                    (results[val[index].class] = results[val[index].class] || []).push(val[index].student);
                }
                return results;
            }, {})
            return results;

        } catch (error) {
            console.error(error);
        }

    }
    logout() {
        //remove current student from localstorage once loggedout
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        //get current logged in student from localstorage
        const user = localStorage.getItem("user");
        if (user) return user;
        return null;
    }
}
export default new Service();
