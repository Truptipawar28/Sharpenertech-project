//Axios Globals
axios.defaults.headers.common['X-Auth-Token'] = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


//Get request
function getTodos(){

    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params: {
    //         _limit: 5
    //     }
    // })
    // .then(res => showOutput(res));   //return promise and give respose
    // .catch(err => console.error(err));  //catch any errors if something goes wrong

//By using ".get"

    axios
            .get('https://jsonplaceholder.typicode.com/todos?_limit: 5', {
                timeout: 5000})
        .then(res => showOutput(res))   
        .catch(err => console.error(err));


    // axios('https://jsonplaceholder.typicode.com/todos_limit: 5')
    //     .then(res => showOutput(res));   
    //     .catch(err => console.error(err));


}

//Post Request

function addTodo(){
axios
        .post('https://jsonplaceholder.typicode.com/todos/1',{
            title: "New Todo",
            completed: false  
    })
    .then(res => showOutput(res))   
    .catch(err => console.error(err));  
}

//Put/Patch request
function updateTodo(){
    axios
    .put('https://jsonplaceholder.typicode.com/todos/1',{
            title: "Updated Todo",
            completed: true  
    })
    .then(res => showOutput(res))   
    .catch(err => console.error(err));  
}

//Delete Request
function removeTodo(){
    axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => showOutput(res))
        .catch(err => console.error(err));
    }

    //Simultaneous Data
    function getData(){
        // axios.all([
        //     axios.get('https://jsonplaceholder.typicode.com/todos'),
        //     axios.get('https://jsonplaceholder.typicode.com/posts')
        // ])
        // .then(res => {
        //     console.log(res[0]);
        //     console.log(res[1]);
        //     showOutput(res[1]);
        // })
        // .catch(err => console.error(err));

        axios
        .all([
                axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
                axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
            ])
            .then(axios.spread((todo, posts) => showOutput(posts)))
            .catch(err => console.error(err));
    }

    //Custom Headers
    function customHeaders(){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'sometoken'
            }
        }
        axios
        .post('https://jsonplaceholder.typicode.com/todos/1',{
            title: "New Todo",
            completed: false  
    },
    config
    )
    .then(res => showOutput(res))   
    .catch(err => console.error(err));  
    }

    //Transforming requesting and responses
    function transformResponse(){
        const options = {
            method: 'post',
            url: 'https://jsonplaceholder.typicode.com/todos',
            data: {
                title: 'Hello World'
            },
            transformResponse: axios.defaults.transformResponse.concat(data => {
                data.title = data.title.toUpperCase();
                return data;
            })
        };

        axios(options).then(res => showOutput(res));
    }

    //Error Handling
function errorHandling() {
    axios
            .get('https://jsonplaceholder.typicode.com/todos', {
            // validateStatus: function(status) {
            //     return status < 500; //Reject only if status is greater or equal to 500
            // }
        })
        .then(res => showOutput(res))   
        .catch(err => {
            if(error.response){
                //Server responded with a status other than 200 range
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

                if(err.response.status === 404){
                    alert('error: Page Not Found');
                }
        } else if (err.request) {
            //Request waas made but no response
            console.error(err.request);
        } else {
            console.error(err.message);
        }
    });
}

//Cancel Token
function cancelToken(){
    const source = axios.cancelToken.source();

    axios
            .get('https://jsonplaceholder.typicode.com/todos', {
                cancelToken: source.token
            })
            .then(res => showOutput(res))
            .catch(thrown => {
                if(axios.isCancel(thrown)){
                    console.log('Request cancelled', thrown.message);
                }
            });

            if(true) {
                source.cancel('Request cancelled!');
            }
}

//Axios Instance
const axiosInstance = axios.create({
    //OTHER CUSTOM SETTINGS
    baseURL: 'https://jsonplaceholder.typicode.com'
});



axiosInstance.get('/comments').then(res => showOutput(res));

// Intercepting rquests and responses
axios.interceptors.request.use(config => {
    console.log(`${config.method.toUpperCase()} request send to ${config.url} at ${new Date().getTime()}`)

    return config
}, error => {
    return Promise.reject(error)
});

//show output in browser
function showOutput(res){
    document.getElementById('res').innerHTML = `
    <div class = "card card-body mb-4">
    <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}