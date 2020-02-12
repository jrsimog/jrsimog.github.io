const serverRequest = async (url, method, body, formData=false,credentials=[]) => {
    var data = {};
    var byRequest = {};
    if(formData){
        data = body;
    }else{
        data = JSON.stringify(body);
    }
    if(method == 'POST'){
        byRequest = new Request(url, {
            method: method,
            body: data,
        });
    }else if(method == 'GET'){
        byRequest = new Request(url, {
            method: method,
            Headers:     {   
                Accept: '*/*' 
            }
        });
    }
    var responseServer = await fetch(byRequest)
        .then(response => {
            if (!response.redirected) {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Algo salió mal en el servidor api!");
                }
            } else {
                location.reload();
            }
        })
        .catch(error => {
            console.error(error);
        });
    return responseServer;
};