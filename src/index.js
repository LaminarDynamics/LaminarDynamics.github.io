// // 11-17-21
// // 11-21-21



if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered!");
        console.log(registration);
    }).catch(error => {
        console.log("SW Registration FAILED");
        console.log(error);
    })
}


// // Get total local storage available
// // async function GetStorage() {

// //     if (navigator.storage && navigator.storage.estimate) {
// //         const quota = await navigator.storage.estimate();
// //         // quota.usage -> Number of bytes used.
// //         // quota.quota -> Maximum number of bytes available.
// //         const percentageUsed = (quota.usage / quota.quota) * 100;
// //         console.log(`You've used ${percentageUsed}% of the available storage.`);
// //         const remaining = quota.quota - quota.usage;
// //         console.log(`You can write up to ${remaining} more bytes.`);
// //     }
// // }


// // function displayNotification() {
// //     if (Notification.permission == 'granted') {
// //         navigator.serviceWorker.getRegistration().then(function (reg) {
// //             // reg.showNotification('Hello world!');
// //             var date = new Date();
// //             reg.showNotification(date);
// //         });
// //     }
// // }