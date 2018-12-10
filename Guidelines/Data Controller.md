# Data Controller

Requests should not be sent from every individual components but from a controller class named *DataController*.

####Example

```javascript
getActiveCustomersData (parameters) {
    // This function returns a Promise that resolves with the customers count
    return new Promise((resolve, reject) => {
      this.post('dashboard-service/visitors/count', parameters)
        .then(response => {
          resolve(response.data.total)
        })
        .catch(error => reject(error))
    })
}
```



#### Testing

*Dependency Injection* design pattern is used in the DataController implementation. We pass an instance of the libraries used in the constructor as seen below.

```javascript
constructor (api, auth0) {
    this.api = api
    this.auth0 = auth0
}
```

While writing tests, mock classes can be passed here instead to send fake responses back. An example for writing tests for DataController can be found [here](https://github.com/codeuniversity/triangl-dashboard/blob/develop/test/unit/specs/DataController.test.js).



####Visual Diagram

![Visual Diagram](https://duaw26jehqd4r.cloudfront.net/items/0E1N2r393Q1X1R140M08/Untitled%20Diagram-2.jpg?v=d03ab9ed)

