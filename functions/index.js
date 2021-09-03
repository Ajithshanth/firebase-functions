// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //

const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const express = require("express");
const app = express();

const userCollection = "users";
const COLLECTION_NAME = "cloud-functions-firestore";

//import { collection, addDoc } from "firebase/firestore";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// [START trigger_new_document]

exports.createCount = functions.firestore
  .document("orders/{id}")
  .onCreate(async (snap, context) => {
    const userQuerySnapshot = await db.collection("orders").get();
    const orders = [];
    const ordersTest = [];

    userQuerySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    // console.log("orders");
    // console.log(orders);
    // console.log("-------------------------------------------");

    orders.forEach((order) => {
      const orderDate = order.data.date;
      ordersTest.push({
        Date: orderDate,
      });
    });
    // console.log("ordersTest");
    // console.log(ordersTest);
    // console.log("-------------------------------------------");

    const stringOrderTest = ordersTest.map(function (item) {
      return item["Date"];
    });

    // console.log("stringOrderTest");
    // console.log(stringOrderTest);
    // console.log("-------------------------------------------");

    var getDaysArray = function (start, end) {
      for (
        var arr = [], dt = new Date(start);
        dt <= end;
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(
          dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
        );
      }
      return arr;
    };

    var daylist = getDaysArray(
      new Date(1630454400000),
      new Date(1704067199000)
    );

    const finalDates = [];
    const newFinalDates = [];

    //Change 1 : New Array of Month

    var aug2021 = getDaysArray(
      new Date(1627776000000),
      new Date(1630454399000)
    );

    var sep2021 = getDaysArray(
      new Date(1630454400000),
      new Date(1633046399000)
    );
    var oct2021 = getDaysArray(
      new Date(1633046400000),
      new Date(1635724799000)
    );
    var nov2021 = getDaysArray(
      new Date(1635724800000),
      new Date(1638316799000)
    );
    var dec2021 = getDaysArray(
      new Date(1638316800000),
      new Date(1640995199000)
    );

    for (var i = 0; i < stringOrderTest.length; i++) {
      let timestamp = stringOrderTest[i];

      var a = parseInt(timestamp);
      var b = new Date(a);

      var yyy = b.getFullYear();
      var mm = b.getMonth() + 1;
      var dd = b.getDate() - 1;

      var final = yyy + "-" + mm + "-" + dd;

      // console.log(timestamp + " : " + final);

      finalDates.push(final);

      //Change 2 : If Statement to push data to the new month array

      if (yyy == 2021 && mm == 8) {
        aug2021.push(final);
      }

      if (yyy == 2021 && mm == 9) {
        sep2021.push(final);
      }
      if (yyy == 2021 && mm == 10) {
        oct2021.push(final);
      }
      if (yyy == 2021 && mm == 11) {
        nov2021.push(final);
      }
      if (yyy == 2021 && mm == 12) {
        dec2021.push(final);
      }
    }

    console.log("seperated");
    console.log(aug2021);
    console.log(sep2021);
    console.log(oct2021);

    //Change 3 : push the new array to another array
    newFinalDates.push(aug2021, sep2021, oct2021, nov2021, dec2021);

    console.log("-------------------------------------------");
    console.log("newFinalDates");
    console.log(newFinalDates);
    console.log("-------------------------------------------");

    const newFinalOrd = [];

    for (var i = 0; i < newFinalDates.length; i++) {
      const newMap = newFinalDates[i].reduce(
        (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
        new Map()
      );

      // console.log("newMap");
      // console.log(newMap);
      // console.log("-------------------------------------------");

      const sampleFinalOrd = [...newMap.entries()];

      for (var j = 0; j < newMap.size; j++) {
        newFinalOrd.push(sampleFinalOrd);
      }
    }

    // console.log("newFinalOrd");
    // console.log(newFinalOrd);
    // console.log("-------------------------------------------");

    let newFinalOrdN = [...new Set(newFinalOrd)];

    // console.log("newFinalOrdN");
    // console.log(newFinalOrdN);
    // console.log("-------------------------------------------");

    // console.log("datesN");
    // console.log(datesN);
    // console.log("-------------------------------------------");

    // console.log("countsN");
    // console.log(countsN);
    // console.log("-------------------------------------------");

    // console.log("newFinalOrdN Seperated");
    // console.log(newFinalOrdN[0]);
    // console.log(newFinalOrdN[1]);
    // console.log(newFinalOrdN[2]);
    // console.log(newFinalOrdN[3]);

    //Change 4 : create 3 new arrays in same format

    const dates0 = [];
    const dates1 = [];
    const dates2 = [];
    const dates3 = [];
    const dates4 = [];

    const counts0 = [];
    const counts1 = [];
    const counts2 = [];
    const counts3 = [];
    const counts4 = [];

    var datescount0 = {};
    var datescount1 = {};
    var datescount2 = {};
    var datescount3 = {};
    var datescount4 = {};

    const allDatesCounts = [];

    //Change 5 : create a for loop to create the object

    for (var i = 0; i < newFinalOrdN[0].length; i++) {
      dates0.push(newFinalOrdN[0][i][0]);
      counts0.push(newFinalOrdN[0][i][1]);
    }
    const newCounts0 = counts0.map((element) => element - 1);

    datescount0 = Object.fromEntries(
      dates0.map((_, i) => [dates0[i], newCounts0[i]])
    );

    for (var i = 0; i < newFinalOrdN[1].length; i++) {
      dates1.push(newFinalOrdN[1][i][0]);
      counts1.push(newFinalOrdN[1][i][1]);
    }
    const newCounts1 = counts1.map((element) => element - 1);

    datescount1 = Object.fromEntries(
      dates1.map((_, i) => [dates1[i], newCounts1[i]])
    );

    for (var i = 0; i < newFinalOrdN[2].length; i++) {
      dates2.push(newFinalOrdN[2][i][0]);
      counts2.push(newFinalOrdN[2][i][1]);
    }
    const newCounts2 = counts2.map((element) => element - 1);

    datescount2 = Object.fromEntries(
      dates2.map((_, i) => [dates2[i], newCounts2[i]])
    );

    for (var i = 0; i < newFinalOrdN[3].length; i++) {
      dates3.push(newFinalOrdN[3][i][0]);
      counts3.push(newFinalOrdN[3][i][1]);
    }
    const newCounts3 = counts3.map((element) => element - 1);

    datescount3 = Object.fromEntries(
      dates3.map((_, i) => [dates3[i], newCounts3[i]])
    );

    for (var i = 0; i < newFinalOrdN[4].length; i++) {
      dates4.push(newFinalOrdN[4][i][0]);
      counts4.push(newFinalOrdN[4][i][1]);
    }
    const newCounts4 = counts4.map((element) => element - 1);

    datescount4 = Object.fromEntries(
      dates4.map((_, i) => [dates4[i], newCounts4[i]])
    );

    //Change 6 : push the new arry to another arry

    allDatesCounts.push(
      datescount0,
      datescount1,
      datescount2,
      datescount3,
      datescount4
    );

    // console.log(datescount0);
    // console.log(datescount1);
    // console.log(datescount2);
    // console.log(datescount3);

    console.log("OMG");
    console.log(allDatesCounts);

    console.log(
      "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-"
    );

    // console.log("-------------------------------------------");
    // console.log("finalDates");
    // console.log(finalDates);
    // console.log("-------------------------------------------");

    const map = finalDates.reduce(
      (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
      new Map()
    );

    // console.log("map");
    // console.log(map);
    // console.log("-------------------------------------------");

    const finalOrd = [...map.entries()];

    console.log("finalOrd");
    console.log(finalOrd);
    console.log("-------------------------------------------");

    const dates = [];
    const counts = [];

     

    const graph = admin
      .firestore()
      .collection("graph")
      .doc("orders")
      .collection("data");

    var getDocsArray = function (start, end) {
      for (
        var arr = [], dt = new Date(start);
        dt <= end;
        dt.setDate(dt.getDate() + 1)
      ) {
        var months = [
          "",
          "01 - January",
          "02 - February",
          "03 - March",
          "04 - April",
          "05 - May",
          "06 - June",
          "07 - July",
          "08 - August",
          "09 - September",
          "10 - October",
          "11 - November",
          "12 - December",
        ];
        let month = months[dt.getMonth() + 1];
        arr.push(dt.getFullYear() + "-" + month);
      }
      return arr;
    };

    var docList = getDocsArray(
      new Date(1627776000000),
      new Date(1640995199000)
    );

    let docListArray = [...docList];
    let docListArrayN = [...new Set(docListArray)];

    for (var j = 0; j < docListArrayN.length; j++) {
      [docListArrayN[j]].forEach((month) => {
        console.log(docListArrayN[j]);
        const documentReference = graph.doc(month);
          return documentReference.set(allDatesCounts[j]);
      });
    }
  });

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.writeToFirestoreNew = functions.firestore
  .document("/order/{id}")
  .onCreate((snap, context) => {
    console.log(snap.data());

    const collection = context.params.collection;
    const userId = context.params.userId;

    const newValue = snap.data();

    // access a particular field as you would any JS property
    const name = newValue.name;
  });

// exports.createCount = functions.firestore
// .document("orders/{id}")
// .onCreate(async (snap, context) => {
//   const userQuerySnapshot = await db.collection("orders").get();
//   const orders = [];
//   const ordersTest = [];

//   userQuerySnapshot.forEach((doc) => {
//     orders.push({
//       id: doc.id,
//       data: doc.data(),
//     });
//   });

//   // console.log("orders");
//   // console.log(orders);
//   // console.log("-------------------------------------------");

//   orders.forEach((order) => {
//     const orderDate = order.data.date;
//     ordersTest.push({
//       Date: orderDate,
//     });
//   });
//   // console.log("ordersTest");
//   // console.log(ordersTest);
//   // console.log("-------------------------------------------");

//   const stringOrderTest = ordersTest.map(function (item) {
//     return item["Date"];
//   });

//   // console.log("stringOrderTest");
//   // console.log(stringOrderTest);
//   // console.log("-------------------------------------------");

//   var getDaysArray = function (start, end) {
//     for (
//       var arr = [], dt = new Date(start);
//       dt <= end;
//       dt.setDate(dt.getDate() + 1)
//     ) {
//       arr.push(
//         dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
//       );
//     }
//     return arr;
//   };

//   var daylist = getDaysArray(
//     new Date(1630454400000),
//     new Date(1704067199000)
//   );

//   const finalDates = [];
//   const newFinalDates = [];

//   //Change 1 : New Array of Month

//   var sep2021 = getDaysArray(
//     new Date(1630454400000),
//     new Date(1633046399000)
//   );
//   var oct2021 = getDaysArray(
//     new Date(1633046400000),
//     new Date(1635724799000)
//   );
//   var nov2021 = getDaysArray(
//     new Date(1635724800000),
//     new Date(1638316799000)
//   );
//   var dec2021 = getDaysArray(
//     new Date(1638316800000),
//     new Date(1640995199000)
//   );

//   for (var i = 0; i < stringOrderTest.length; i++) {
//     let timestamp = stringOrderTest[i];

//     var a = parseInt(timestamp);
//     var b = new Date(a);

//     var yyy = b.getFullYear();
//     var mm = b.getMonth() + 1;
//     var dd = b.getDate();

//     var final = yyy + "-" + mm + "-" + dd;

//     // console.log(timestamp + " : " + final);

//     finalDates.push(final);

//     //Change 2 : If Statement to push data to the new month array

//     if (yyy == 2021 && mm == 9) {
//       sep2021.push(final);
//     }
//     if (yyy == 2021 && mm == 10) {
//       oct2021.push(final);
//     }
//     if (yyy == 2021 && mm == 11) {
//       nov2021.push(final);
//     }
//     if (yyy == 2021 && mm == 12) {
//       dec2021.push(final);
//     }
//   }

//   // console.log("seperated");
//   // console.log(sep2021);
//   // console.log(oct2021);

//   //Change 3 : push the new array to another array
//   newFinalDates.push(sep2021, oct2021, nov2021, dec2021);

//   // console.log("-------------------------------------------");
//   // console.log("newFinalDates");
//   // console.log(newFinalDates);
//   // console.log("-------------------------------------------");

//   const newFinalOrd = [];

//   for (var i = 0; i < newFinalDates.length; i++) {
//     const newMap = newFinalDates[i].reduce(
//       (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
//       new Map()
//     );

//     // console.log("newMap");
//     // console.log(newMap);
//     // console.log("-------------------------------------------");

//     const sampleFinalOrd = [...newMap.entries()];

//     for (var j = 0; j < newMap.size; j++) {
//       newFinalOrd.push(sampleFinalOrd);
//     }
//   }

//   // console.log("newFinalOrd");
//   // console.log(newFinalOrd);
//   // console.log("-------------------------------------------");

//   let newFinalOrdN = [...new Set(newFinalOrd)];

//   // console.log("newFinalOrdN");
//   // console.log(newFinalOrdN);
//   // console.log("-------------------------------------------");

//   // for (var i = 0; i < newFinalOrdN.length; i++) {
//   //   for (var j = 0; j < newFinalOrdN[i].length; j++) {
//   //     datesN.push(newFinalOrdN[i][j][0]);
//   //     countsN.push(newFinalOrdN[i][j][1]);
//   //   }
//   // }

//   // console.log("datesN");
//   // console.log(datesN);
//   // console.log("-------------------------------------------");

//   // console.log("countsN");
//   // console.log(countsN);
//   // console.log("-------------------------------------------");

//   // console.log("newFinalOrdN Seperated");
//   // console.log(newFinalOrdN[0]);
//   // console.log(newFinalOrdN[1]);
//   // console.log(newFinalOrdN[2]);
//   // console.log(newFinalOrdN[3]);

//   //Change 4 : create 3 new arrays in same format

//   const dates0 = [];
//   const dates1 = [];
//   const dates2 = [];
//   const dates3 = [];
//   const dates4 = [];

//   const counts0 = [];
//   const counts1 = [];
//   const counts2 = [];
//   const counts3 = [];
//   const counts4 = [];

//   var datescount0 = {};
//   var datescount1 = {};
//   var datescount2 = {};
//   var datescount3 = {};
//   var datescount4 = {};

//   const allDatesCounts = [];

//   //Change 5 : create a for loop to create the object

//   for (var i = 0; i < newFinalOrdN[0].length; i++) {
//     dates0.push(newFinalOrdN[0][i][0]);
//     counts0.push(newFinalOrdN[0][i][1]);
//   }
//   const newCounts0 = counts0.map((element) => element - 1);

//   datescount0 = Object.fromEntries(
//     dates0.map((_, i) => [dates0[i], newCounts0[i]])
//   );

//   for (var i = 0; i < newFinalOrdN[1].length; i++) {
//     dates1.push(newFinalOrdN[1][i][0]);
//     counts1.push(newFinalOrdN[1][i][1]);
//   }
//   const newCounts1 = counts1.map((element) => element - 1);

//   datescount1 = Object.fromEntries(
//     dates1.map((_, i) => [dates1[i], newCounts1[i]])
//   );

//   for (var i = 0; i < newFinalOrdN[2].length; i++) {
//     dates2.push(newFinalOrdN[2][i][0]);
//     counts2.push(newFinalOrdN[2][i][1]);
//   }
//   const newCounts2 = counts2.map((element) => element - 1);

//   datescount2 = Object.fromEntries(
//     dates2.map((_, i) => [dates2[i], newCounts2[i]])
//   );

//   for (var i = 0; i < newFinalOrdN[3].length; i++) {
//     dates3.push(newFinalOrdN[3][i][0]);
//     counts3.push(newFinalOrdN[3][i][1]);
//   }
//   const newCounts3 = counts3.map((element) => element - 1);

//   datescount3 = Object.fromEntries(
//     dates3.map((_, i) => [dates3[i], newCounts3[i]])
//   );

//   //Change 6 : push the new arry to another arry

//   allDatesCounts.push(datescount0, datescount1, datescount2, datescount3);

//   // console.log(datescount0);
//   // console.log(datescount1);
//   // console.log(datescount2);
//   // console.log(datescount3);

//   console.log("OMG");
//   console.log(allDatesCounts);

//   console.log(
//     "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-"
//   );

//   // console.log("-------------------------------------------");
//   // console.log("finalDates");
//   // console.log(finalDates);
//   // console.log("-------------------------------------------");

//   const map = finalDates.reduce(
//     (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
//     new Map()
//   );

//   // console.log("map");
//   // console.log(map);
//   // console.log("-------------------------------------------");

//   const finalOrd = [...map.entries()];

//   console.log("finalOrd");
//   console.log(finalOrd);
//   console.log("-------------------------------------------");

//   const dates = [];
//   const counts = [];

//   for (var i = 0; i < finalOrd.length; i++) {
//     dates.push(finalOrd[i][0]);
//     counts.push(finalOrd[i][1]);
//   }

//   console.log("dates");
//   console.log(dates);
//   console.log("-------------------------------------------");

//   console.log("counts");
//   console.log(counts);
//   console.log("-------------------------------------------");

//   var datescount = {};

//   datescount = Object.fromEntries(dates.map((_, i) => [dates[i], counts[i]]));

//   console.log("datescount");
//   console.log(datescount);
//   console.log("-------------------------------------------");

//   console.log("-------------------------------------------");
//   console.log("-------------------------------------------");

//   const result = finalOrd.map(function (row) {
//     return {
//       Date: row[0],
//       Count: row[1],
//     };
//   });

//   console.log("result");
//   console.log(result);
//   console.log("-------------------------------------------");

//   const graph = admin
//     .firestore()
//     .collection("graph")
//     .doc("orders")
//     .collection("data");

//   var getDocsArray = function (start, end) {
//     for (
//       var arr = [], dt = new Date(start);
//       dt <= end;
//       dt.setDate(dt.getDate() + 1)
//     ) {
//       var months = [
//         "",
//         "01 - January",
//         "02 - February",
//         "03 - March",
//         "04 - April",
//         "05 - May",
//         "06 - June",
//         "07 - July",
//         "08 - August",
//         "09 - September",
//         "10 - October",
//         "11 - November",
//         "12 - December",
//       ];
//       let month = months[dt.getMonth() + 1];
//       arr.push(dt.getFullYear() + "-" + month);
//     }
//     return arr;
//   };

//   var docList = getDocsArray(
//     new Date(1630454400000),
//     new Date(1640995199000)
//   );
//   let docListArray = [...docList];
//   let docListArrayN = [...new Set(docListArray)];

//   console.log("docListArrayN");
//   console.log(docListArrayN);
//   console.log("result");
//   console.log(result);

//   for (var j = 0; j < docListArrayN.length; j++) {
//     [docListArrayN[j]].forEach((month) => {
//       console.log(docListArrayN[j]);
//       const documentReference = graph.doc(month);
//       for (var i = 0; i < dates.length; i++) {
//         [dates[i]].forEach((date) => {
//           return documentReference.set(allDatesCounts[j]);
//         });
//       }
//     });
//   }
// });

// exports.writeToFirestore = functions.firestore
//   .document("/{collection}/{userId}")
//   .onCreate((snap, context) => {
//     console.log(snap.data());

//     const collection = context.params.collection;

//     const userId = context.params.userId;

//     const activities = admin.firestore().collection("activities");
//     const activitiesNew = admin
//       .firestore()
//       .collection("activitiesNew")
//       .doc(userId)
//       .collection("InsideCollection");

//     for (var i = 0; i < collection.length; i++) {
//       if (collection === "ordersTese") {
//         let orders = "s";
//         return activitiesNew.add({ text: orders });
//       }
//       if (collection === "users") {
//         return activities.add({ text: "Bye" });
//       }

//       return null;
//     }
//   });

// exports.setupCollectionForUser = functions.firestore
//   .document("usersN/{userId}")
//   .onCreate((snap, context) => {
//     const userId = context.params.userId;

//     db.collection("master")
//       .get()
//       .then((snapshot) => {
//         if (snapshot.empty) {
//           console.log("no docs found");
//           return;
//         }

//         snapshot.forEach(function (doc) {
//           return db
//             .collection("usersN")
//             .doc(userId)
//             .collection("slave")
//             .doc(doc.get("uid"))
//             .set(doc.data());
//         });
//       });
//   });

app.get("/orders/month", async (req, res) => {
  const dateNow = Date.now();
  const dateOld = Date.now() - 2629743000;

  // const dateNowString = dateNow.toString();
  // const dateOldString = dateOld.toString();

  // console.log(dateNowString);
  // console.log(dateOldString);

  try {
    const userQuerySnapshot = await db
      .collection("orders")
      //.where("date", ">", dateOldString)
      //.where("date", "<", dateNowString)
      .get();
    const orders = [];
    const ordersTest = [];

    userQuerySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    console.log("orders");
    console.log(orders);
    console.log("-------------------------------------------");

    orders.forEach((order) => {
      const orderDate = order.data.date;
      ordersTest.push({
        Date: orderDate,
      });
    });
    console.log("ordersTest");
    console.log(ordersTest);
    console.log("-------------------------------------------");

    const stringOrderTest = ordersTest.map(function (item) {
      return item["Date"];
    });

    const finalDates = [];

    const orderedDates = [];
    // const ordersByYears = [];

    // const orderDatesYear = [];
    // const y2020 = [];
    // const y2021 = [];
    // const y2022 = [];
    // const y2023 = [];
    // const y2024 = [];
    // const y2025 = [];

    const jan = [];
    const feb = [];
    const mar = [];
    const apr = [];
    const may = [];
    const jun = [];
    const jul = [];
    const aug = [];
    const sep = [];
    const oct = [];
    const nov = [];
    const dec = [];

    for (var i = 0; i < stringOrderTest.length; i++) {
      let timestamp = stringOrderTest[i];

      var a = parseInt(timestamp);
      var b = new Date(a);

      var year = b.getFullYear();
      var month = b.getMonth() + 1;
      var date = b.getDate();

      var final = year + "-" + month + "-" + date;
      //var final = date + "/" + month + "/" + year;

      console.log(timestamp + " : " + final);

      finalDates.push(final);

      if (month == 1) {
        jan.push(final);
      }
      if (month == 2) {
        feb.push(final);
      }
      if (month == 3) {
        mar.push(final);
      }
      if (month == 4) {
        apr.push(final);
      }
      if (month == 5) {
        may.push(final);
      }
      if (month == 6) {
        jun.push(final);
      }
      if (month == 7) {
        jul.push(final);
      }
      if (month == 8) {
        aug.push(final);
      }
      if (month == 9) {
        sep.push(final);
      }
      if (month == 10) {
        oct.push(final);
      }
      if (month == 11) {
        nov.push(final);
      }
      if (month == 12) {
        dec.push(final);
      }
    }
    orderedDates.push(
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec
    );

    console.log("-------------------------------------------");
    console.log("Dates from Firebase");
    console.log("All Dates");
    console.log(finalDates);
    console.log("Seperate Array");
    console.log(orderedDates);

    var getDaysArray = function (start, end) {
      for (
        var arr = [], dt = new Date(start);
        dt <= end;
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(
          dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
        );
      }
      return arr;
    };

    //    var daylist = getDaysArray(new Date(1577836800000), new Date(Date.now()));

    var daylist = getDaysArray(
      new Date(1630454400000),
      new Date(1704067199000)
    );

    var getDocsArray = function (start, end) {
      for (
        var arr = [], dt = new Date(start);
        dt <= end;
        dt.setDate(dt.getDate() + 1)
      ) {
        var months = [
          "",
          "01 - January",
          "02 - February",
          "03 - March",
          "04 - April",
          "05 - May",
          "06 - June",
          "07 - July",
          "08 - August",
          "09 - September",
          "10 - October",
          "11 - November",
          "12 - December",
        ];
        let month = months[dt.getMonth() + 1];
        arr.push(dt.getFullYear() + "-" + month);
      }
      return arr;
    };

    var docList = getDocsArray(
      new Date(1630454400000),
      new Date(1704067199000)
    );
    let docListArray = [...docList];
    let docListArrayN = [...new Set(docListArray)];

    // console.log("docListArrayN");
    // console.log(docListArrayN);
    // console.log("-------------------------------------------");
    // console.log("Dates from Array");
    // console.log(daylist);

    const ord = [...daylist, ...finalDates];
    // console.log("ord");
    // console.log(ord);

    // const newOrd = [];
    // for (var i = 0; i < ord.length; i++) {
    //   var dateString = ord[i];
    //   var dateDate = Date.parse(dateString);
    //   newOrd.push(dateDate);
    // }

    // console.log(newOrd);

    const map = ord.reduce(
      (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
      new Map()
    );

    const finalOrd = [...map.entries()];

    const result = finalOrd.map(function (row) {
      return {
        Date: row[0],
        Count: row[1] - 1,
      };
    });

    // console.log("-------------------------------------------");
    // console.log("Result");
    // console.log(result);

    res.status(200).json(result);

    const writePromises = [];

    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
    const months = [
      "01 January",
      "02 February",
      "03 March",
      "04 April",
      "05 May",
      "06 June",
      "07 July",
      "08 August",
      "09 September",
      "10 October",
      "11 November",
      "12 December",
    ];

    const graph = db.collection("graph").doc("orders").collection("data");
    // for (var i = 0; i < docListArrayN.length; i++) {
    //   [docListArrayN[i]].forEach((month) => {
    //     const documentReference = graph.doc(month);
    //     for (var i = 0; i < 30; i++) {
    //       [ord[i]].forEach((date) => {
    //         const datesReference = documentReference.collection(date);
    //         Object.keys(result[i]).forEach((date) => {
    //           writePromises.push(
    //             datesReference.doc(date).set({
    //               Date: result[i][date],
    //             })
    //           );
    //         });
    //       });
    //     }
    //   });
    // }

    [docListArrayN[0]].forEach((month) => {
      const documentReference = graph.doc(month);
      for (var i = 0; i < 30; i++) {
        [ord[i]].forEach((date) => {
          const datesReference = documentReference.collection(date);
          Object.keys(result[i]).forEach((date) => {
            writePromises.push(
              datesReference.doc(date).set({
                Date: result[i][date],
              })
            );
          });
        });
      }
    });

    [docListArrayN[1]].forEach((month) => {
      const documentReference = graph.doc(month);
      for (var i = 30; i < 62; i++) {
        [ord[i]].forEach((date) => {
          const datesReference = documentReference.collection(date);
          Object.keys(result[i]).forEach((date) => {
            writePromises.push(
              datesReference.doc(date).set({
                Date: result[i][date],
              })
            );
          });
        });
      }
    });

    [docListArrayN[2]].forEach((month) => {
      const documentReference = graph.doc(month);
      for (var i = 62; i < 91; i++) {
        [ord[i]].forEach((date) => {
          const datesReference = documentReference.collection(date);
          Object.keys(result[i]).forEach((date) => {
            writePromises.push(
              datesReference.doc(date).set({
                Date: result[i][date],
              })
            );
          });
        });
      }
    });

    // [docListArrayN[3]].forEach((month) => {
    //   const documentReference = graph.doc(month);
    //   for (var i = 91; i < 122; i++) {
    //     [ord[i]].forEach((date) => {
    //       const datesReference = documentReference.collection(date);
    //       Object.keys(result[i]).forEach((date) => {
    //         writePromises.push(
    //           datesReference.doc(date).set({
    //             Date: result[i][date],
    //           })
    //         );
    //       });
    //     });
    //   }
    // });

    // [docListArrayN[4]].forEach((month) => {
    //   const documentReference = graph.doc(month);
    //   for (var i = 122; i < 153; i++) {
    //     [ord[i]].forEach((date) => {
    //       const datesReference = documentReference.collection(date);
    //       Object.keys(result[i]).forEach((date) => {
    //         writePromises.push(
    //           datesReference.doc(date).set({
    //             Date: result[i][date],
    //           })
    //         );
    //       });
    //     });
    //   }
    // });

    // [docListArrayN[5]].forEach((month) => {
    //   const documentReference = graph.doc(month);
    //   for (var i = 153; i < 181; i++) {
    //     [ord[i]].forEach((date) => {
    //       const datesReference = documentReference.collection(date);
    //       Object.keys(result[i]).forEach((date) => {
    //         writePromises.push(
    //           datesReference.doc(date).set({
    //             Date: result[i][date],
    //           })
    //         );
    //       });
    //     });
    //   }
    // });

    // months.forEach((month) => {
    //   const documentReference = forGraph.doc(month);
    //   //writePromises.push(documentReference.set({ reserved: "" }));

    //   const datesReference = documentReference.collection("dates");

    //   const dataMap = {
    //     "001": "08:00-09:00",
    //     "002": "09:00-10:00",
    //     "003": "10:00-11:00",
    //     "004": "11:00-12:00",
    //     "005": "11:00-12:00",
    //   };

    //   const dateMap = [
    //     "08:00-09:00",
    //     "09:00-10:00",
    //     "10:00-11:00",
    //     "11:00-12:00",
    //     "11:00-12:00",
    //   ];

    //   Object.keys(finalDates).forEach((hour) => {
    //     writePromises.push(
    //       datesReference.doc(hour).set({
    //         Date: finalDates[hour],

    //         // reserved: "",
    //       })
    //     );
    //   });
    // });
  } catch (error) {
    res.status(500).send(error);
  }
});

exports.dashboard = functions.https.onRequest(app);

// exports.writeToFirestore = functions.firestore
//   .document("users/userId")
//   .onWrite((change, context) => {
//     db.doc("users/otherdoc").set({});
//   });

// exports.setupCollectionForUser = functions.firestore
//   .document("users/{userId}")
//   .onCreate((snap, context) => {
//     const userId = context.params.userId;

//     return db
//       .collection("master")
//       .get()
//       .then((snapshot) => {
//         if (snapshot.empty) {
//           console.log("no docs found");
//           return null;
//         } else {
//           const promises = [];
//           const slaveRef = db
//             .collection("users")
//             .doc(userId)
//             .collection("slave");
//           snapshot.forEach((doc) => {
//             promises.push(slaveRef.doc(doc.get("uid")).set(doc.data()));
//           });

//           return Promise.all(promises);
//         }
//       });
//   });

//---------------------------------------------------------------------------

// app.get("/users", async (req, res) => {
//   try {
//     const userQuerySnapshot = await db.collection(userCollection).get();
//     const users = [];
//     userQuerySnapshot.forEach((doc) => {
//       users.push({
//         Document_id: doc.id,
//         Document_data: doc.data(),
//       });
//     });
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.get("/orders/monthNew", async (req, res) => {
//   const datee = Date.now() / 1000 - 2629743;

//   const dateNow = Date.now();
//   const dateOld = Date.now() - 2629743000;

//   const dateNowString = dateNow.toString();
//   const dateOldString = dateOld.toString();
//   const dtn = new Date(dateNow);
//   const dto = new Date(dateOld);

//   const dtn_dtn =
//     dtn.getMonth() + 1 + "/" + (dtn.getDate() + "/" + dtn.getFullYear());
//   const dto_dto =
//     dto.getMonth() + 1 + "/" + (dto.getDate() + "/" + dto.getFullYear());

//   // console.log("--------------------------------------------------------");
//   // console.log("Date Now");
//   // console.log(dateNowString);
//   // console.log(dateNow);
//   // console.log(dtn_dtn);
//   // console.log("--------------------------------------------------------");
//   // console.log("Date Old");
//   // console.log(dateOldString);
//   // console.log(dateOld);
//   // console.log(dto_dto);
//   // console.log("--------------------------------------------------------");

//   try {
//     //    const userQuerySnapshot = await db.collection("orders").get();
//     // const dateOnly = userQuerySnapshot.where("id","==","001");

//     const userQuerySnapshot = await db
//       .collection("orders")
//       .where("date", ">", dateOldString)
//       .where("date", "<", dateNowString)
//       .get();

//     const orders = [];
//     const realOrders = [];
//     const ordersTest = [];

//     userQuerySnapshot.forEach((doc) => {
//       realOrders.push({
//         data: doc.data(),
//         //  dateNow: dtn_dtn,
//         //  dateOld: dto_dto,
//       });
//     });

//     realOrders.forEach((order) => {
//       const orderDate = order.data.date;
//       ordersTest.push({
//         Date: orderDate,
//       });
//     });

//     const ordX = [...ordersTest];

//     const counts = {};

//     const stringOrderTest = ordersTest.map(function (item) {
//       return item["Date"];
//     });

//     // stringOrderTest.forEach(function (x) {
//     //   counts[x] = (counts[x] || 0) + 1;
//     // });
//     //  console.log(counts);
//     //  console.log(stringOrderTest);

//     const finalDates = [];

//     for (var i = 0; i < stringOrderTest.length; i++) {
//       let timestamp = stringOrderTest[i];
//       var a = parseInt(timestamp);
//       var b = new Date(a);

//       var year = b.getFullYear();
//       var month = b.getMonth() + 1;
//       var date = b.getDate();

//       var final = date + "/" + month + "/" + year;

//       // console.log(timestamp);
//       // console.log(final);

//       finalDates.push(final);
//     }

//     console.log(finalDates);

//     const finalCounts = [];

//     finalDates.forEach(function (x) {
//       finalCounts[x] = (finalCounts[x] || 0) + 1;
//     });

//     console.log(finalCounts);

//     const mapX = finalDates.reduce(
//       (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
//       new Map()
//     );

//     const finalOrdX = [...mapX.entries()];

//     const resultX = finalOrdX.map(function (row) {
//       return {
//         Date: row[0],
//         Count: row[1],
//       };
//     });

//     //---------------------------

//     var getDaysArray = function (start, end) {
//       for (
//         var arr = [], dt = new Date(start);
//         dt <= end;
//         dt.setDate(dt.getDate() + 1)
//       ) {
//         arr.push(
//           dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear()
//         );
//       }
//       return arr;
//     };
//     var daylist = getDaysArray(
//       new Date(Date.now() - 2629743000),
//       new Date(Date.now())
//     );
//     // daylist.map((v) => v.toLocaleDateString("en-US"));

//     // console.log("daylist");
//     // console.log(daylist);
//     // console.log("--------------------------------------------------------")

//     const ord = [...daylist];

//     for (var i = 0; i < orders.length; i++) {
//       const unixTimestamp = orders[i].data.time;
//       const milliseconds = unixTimestamp * 1000;
//       const dateObject = new Date(milliseconds);
//       const dat = dateObject.toLocaleDateString("en-US");
//       ord.push(dat);
//     }
//     const map = ord.reduce(
//       (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
//       new Map()
//     );

//     const finalOrd = [...map.entries()];

//     const result = finalOrd.map(function (row) {
//       return {
//         Date: row[0],
//         Count: row[1] - 1,
//       };
//     });

//     // let obj =Object.fromEntries(map);
//     //res.status(200).json(result);

//     // console.log("real orders : ");
//     // console.log(realOrders);
//     // console.log("--------------------------------------------------------");
//     // console.log("ordersTest : ");
//     // console.log(ordersTest);
//     // console.log("--------------------------------------------------------");
//     // console.log("result");
//     // console.log(result);
//     // console.log("--------------------------------------------------------");
//     // console.log("orders");
//     // console.log(orders);
//     // console.log("--------------------------------------------------------");
//     // console.log("resultX");
//     // console.log(resultX);
//     // console.log("--------------------------------------------------------");
//     // console.log("ordX");
//     // console.log(resultX);

//     const finalArray = [...result, ...resultX];
//     //const finalArray = result.concat(resultX);
//     console.log("finalArray");
//     //    console.log(finalArray);
//     res.status(200).json(resultX);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.get("/users/:userId", (req, res) => {
//   const userId = req.params.userId;
//   db.collection(userCollection)
//     .doc(userId)
//     .get()
//     .then((user) => {
//       if (!user.exists) throw new Error("User not found");
//       res.status(200).json({ id: user.id, data: user.data() });
//     })
//     .catch((error) => res.status(500).send(error));
// });

// exports.dashboard = functions.https.onRequest(app);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

exports.hello = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello!");
  console.log("hi");

  let timestamp = Date.now();

  var a = parseInt(timestamp);
  var b = new Date(a);

  var year = b.getFullYear();
  var month = b.getMonth() + 1;
  var date = b.getDate();

  var final = year + "-" + month + "-" + date;
  //var final = date + "/" + month + "/" + year;

  console.log(timestamp + " : " + final);
});

// exports.hell = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from c!");
// });

// app.delete('/users/:userId', (req, res) => {
//   db.collection(userCollection).doc(req.params.userId).delete()
//   .then(()=>res.status(204).send("Document successfully deleted!"))
//   .catch(function (error) {
//           res.status(500).send(error);
//   });
// })

// app.get('/', (req, res) => res.status(200).send('Hey there!'))
// exports.app = functions.https.onRequest(app)

// const functions = require("firebase-functions");
//const moment = require("moment"); // require
//moment().format();

// const admin = require("firebase-admin");
// admin.initializeApp();
// const db = admin.firestore();
// const express = require("express");
// const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// app.get("/orders/week", async (req, res) => {
//   const datee = Date.now() / 1000 - 604800;
//   try {
//     const userQuerySnapshot = await db
//       .collection("orders")
//       .where("time", ">", datee)
//       .get();
//     const orders = [];
//     userQuerySnapshot.forEach((doc) => {
//       orders.push({
//         id: doc.id,
//         data: doc.data(),
//       });
//     });
//     const ord = [];
//     for (var i = 0; i < orders.length; i++) {
//       const unixTimestamp = orders[i].data.time;
//       const milliseconds = unixTimestamp * 1000;
//       const dateObject = new Date(milliseconds);
//       const dat = dateObject.toLocaleDateString("en-US");
//       ord.push(dat);
//     }
//     const map = ord.reduce(
//       (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
//       new Map()
//     );
//     const finalOrd = [...map.entries()];

//     const result = finalOrd.map(function (row) {
//       return {
//         Date: row[0],
//         Count: row[1],
//       };
//     });

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.get("/orders/month", async (req, res) => {
//   const datee = Date.now() / 1000 - 2629743;
//   console.log(datee);
//   try {
//     const userQuerySnapshot = await db
//       .collection("orders")
//       .where("time", ">", datee)
//       .get();
//     const orders = [];
//     userQuerySnapshot.forEach((doc) => {
//       orders.push({
//         id: doc.id,
//         data: doc.data(),
//       });
//     });

//     var getDaysArray = function (start, end) {
//       for (
//         var arr = [], dt = new Date(start);
//         dt <= end;
//         dt.setDate(dt.getDate() + 1)
//       ) {
//         arr.push(
//           dt.getMonth() + 1 + "/" + (dt.getDate() + "/" + dt.getFullYear())
//         );
//       }
//       return arr;
//     };
//     var daylist = getDaysArray(
//       new Date(Date.now() - 2629743000),
//       new Date(Date.now())
//     );
//     // daylist.map((v) => v.toLocaleDateString("en-US"));

//     console.log(daylist);

//     const ord = [...daylist];
//     for (var i = 0; i < orders.length; i++) {
//       const unixTimestamp = orders[i].data.time;
//       const milliseconds = unixTimestamp * 1000;
//       const dateObject = new Date(milliseconds);
//       const dat = dateObject.toLocaleDateString("en-US");
//       ord.push(dat);
//     }
//     const map = ord.reduce(
//       (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
//       new Map()
//     );

//     const finalOrd = [...map.entries()];

//     const result = finalOrd.map(function (row) {
//       return {
//         Date: row[0],
//         Count: row[1] - 1,
//       };
//     });

//     console.log(result);
//     // let obj =Object.fromEntries(map);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.get("/orders/:orderId", (req, res) => {
//   const orderId = req.params.orderId;
//   db.collection("orders")
//     .doc(orderId)
//     .get()
//     .then((order) => {
//       if (!order.exists) throw new Error("Order not found");
//       res.status(200).json({ id: order.id, data: order.data() });
//     })
//     .catch((error) => res.status(500).send(error));
// });

//   const dates = [...Array(7)].map((_, i) => {
//     const d = new Date()
//     d.setDate(d.getDate() - i)
//     return d
// })

// var getDaysBetweenDates = function (startDate, endDate) {
//   var now = startDate.clone(),
//     dates = [];

//   while (now.isSameOrBefore(endDate)) {
//     dates.push(now.format("MM/DD/YYYY"));
//     now.add(1, "days");
//   }
//   return dates;
// };

// // var startDate = moment("2021-01-02");
// var sDate = new Date (Date.now());
// var startDate = sDate.toLocaleDateString("en-US");
// // var endDate = moment("2021-01-12");
// var eDate =new Date (Date.now()- 2629743000)
// var endDate = eDate.toLocaleDateString("en-US");
// console.log(startDate,endDate);

// var dateList = getDaysBetweenDates(startDate, endDate);
