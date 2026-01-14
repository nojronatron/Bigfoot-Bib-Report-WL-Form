// set constant defaults here
const MIN_RIDERNUM_CHARACTERS = 1;
const MAX_RIDERNUM_CHARACTERS = 7;

// Utility function gets focusable elements inside #pop1
function getFocusableElements(elName) {
  const pop1 = document.getElementById(elName);
  return pop1 ? pop1.querySelectorAll("input, select, textarea, button") : [];
}

// get data in TheCsvData and clean it up and set the count of entries
function cleanAndCountCsvData() {
  const csvData = GetElementById("TheCsvData").value || "";
  const csvDataArray = csvData.split("\n");

  // use map and filter instead of counting
  const cleanCsvDataArray = csvDataArray
    .map((item) => (item !== undefined ? item.trim() : ""))
    .filter((item) => item.length > 0)
    .map((item) => item.replace(/ *\, */g, ", "));

  GetElementById("TheCsvData").value = cleanCsvDataArray.join("\n");
  GetElementById("entryCount").value = cleanCsvDataArray.length;
}

// converts bib records from csv-delimited and returns tab-delimited version
function convertCsvRecordsToTabbed() {
  let csvData = GetElementById("TheCsvData").value;
  return csvData.replace(/, /g, "\t");
}

// updates both csv and tabbed bib records into their respective elements
function updateCsvAndTabRecordsElement(
  riderNum,
  bibAction,
  time,
  dayOfMonth,
  shortLoc
) {
  let previousRecordsComma = GetElementById("TheCsvData").value;
  let previousRecordsTab = convertCsvRecordsToTabbed();
  GetElementById("TheCsvData").value = formatBibRecord(
    previousRecordsComma,
    riderNum,
    bibAction,
    time,
    dayOfMonth,
    shortLoc,
    ", "
  );
  GetElementById("TheData").value = formatBibRecord(
    previousRecordsTab,
    riderNum,
    bibAction,
    time,
    dayOfMonth,
    shortLoc,
    "\t"
  );
}

// pluck the top record from the csv data and return to the caller
function getTopRecordFromCsvData() {
  let csvData = GetElementById("TheCsvData").value;
  let csvDataArray = csvData.split("\n");
  let topRecord = csvDataArray[0];
  return topRecord;
}

// copy csv data and convert it to tabbed then set tabbed data to tabbed data element
function handleCsvDataEdited() {
  let csvData = GetElementById("TheCsvData").value;
  let tabbedData = convertCsvRecordsToTabbed();
  GetElementById("TheData").value = tabbedData;
  let lastEnteredBibRecord = getTopRecordFromCsvData();
  // force a comma-space delimiter for readability
  let lastEnteredBibRecordParts = lastEnteredBibRecord.split(", ");
  storePreviousRecord(
    lastEnteredBibRecordParts[0],
    lastEnteredBibRecordParts[1],
    lastEnteredBibRecordParts[2],
    lastEnteredBibRecordParts[3],
    lastEnteredBibRecordParts[4]
  );
}

// gets an element by id
function GetElementById(id) {
  return document.getElementById(id);
}

// calculate most likely hours characters returning a best-effort hours value
function getHoursFromTimeString(timeString) {
  const ghColonIndex = timeString.indexOf(":");
  let ghHoursResult = "00";

  // if there is a colon, take character(s) just before it
  if (ghColonIndex > -1) {
    if (ghColonIndex > 2) {
      //var ghHourIndex = ghColonIndex - 2;
      ghHoursResult = timeString.slice(ghColonIndex - 2, ghColonIndex);
    }

    if (ghColonIndex > 0 && ghColonIndex <= 2) {
      ghHoursResult = timeString.slice(0, ghColonIndex);
    }
  } else {
    // if there is no colon take up to 2 leftmost characters depending on timeString size
    if (timeString.length >= 4) {
      ghHoursResult = timeString.slice(
        timeString.length - 4,
        timeString.length - 2
      );
    }

    if (timeString.length === 3) {
      ghHoursResult = timeString.slice(0, 1);
    }

    if (timeString.length <= 2) {
      console.log(
        "Info: TIME value character cound is less than 3. No action required."
      );
    }
  }

  return ghHoursResult;
}

// calculate most likely minutes characters returning a best-effort minutes value
function getMinutesFromTimeString(gmTimeString) {
  const gmColonIndex = gmTimeString.indexOf(":");
  let gmMinutesResult = "00";

  // if there is a colon, take up to 2 characters after it, adding zero(s) to get 2 characters total
  if (gmColonIndex > -1) {
    if (gmColonIndex < gmTimeString.length - 1) {
      // if input :01 then result 01, if input :001 then result 00, etc
      gmMinutesResult = gmTimeString.slice(gmColonIndex + 1, gmColonIndex + 3);
    }

    while (gmMinutesResult.length < 2) {
      // if input was : then result 00, if :1 then result 10, if :2 then result 20, etc
      gmMinutesResult = gmMinutesResult + "0";
    }
  } else {
    // there is no colon in the input so best-effort to find minutes characters
    if (gmTimeString.length == 2) {
      // 11 is 11, 22 is 22 etc
      gmMinutesResult = gmTimeString;
    }
    if (gmTimeString.length > 2) {
      // just take the last two characters there is no way to tell user intent anymore
      gmMinutesResult = gmTimeString.slice(
        gmTimeString.length - 2,
        gmTimeString.length
      );
    }
    if (gmTimeString.length == 1) {
      // if no colon then 1 is 01 minutes, 2 is 02 minutes, etc
      gmMinutesResult = "0" + gmTimeString;
    }
  }

  return gmMinutesResult;
}

// return a valid value for hours or minutes based on maxValue
function sanitizeTimeUnits(stuTimeString, maxValue) {
  let stuTimeNum = Number.parseInt(stuTimeString, 10);

  if (Number.isNaN(stuTimeNum) || stuTimeNum < 0) {
    stuTimeNum == 0;
  }

  if (stuTimeNum > maxValue) {
    stuTimeNum = maxValue;
  }

  let stuResult = stuTimeNum.toString();

  while (stuResult.length < 2) {
    stuResult = "0" + stuResult;
  }

  return stuResult;
}

// take a string and attempt to format it as HHMM using helper methods
function formatTimeValue(ftvTimeString) {
  // eliminate all non-time characters from the string maintaining only numbers and colon character
  const ftvHoursMins = ftvTimeString.replace(/[^\d:]/g, "");
  // get hours and minutes, sanitize the numbers, then concatenate and return
  const ftvHours = getHoursFromTimeString(ftvHoursMins);
  const ftvMinutes = getMinutesFromTimeString(ftvHoursMins);
  const ftvSanitizedHours = sanitizeTimeUnits(ftvHours, 23);
  const ftvSanitizedMinutes = sanitizeTimeUnits(ftvMinutes, 59);
  return ftvSanitizedHours + ftvSanitizedMinutes;
}

function getDayOfMonth(date) {
  const today = date.getDate();
  const day = GetElementById("yesterday").checked
    ? today === 1
      ? 31
      : today - 1
    : today;
  let result = day.toString();

  if (result.length < 2) {
    result = "0" + result;
  }

  return result;
}

function ResetBibDataFields() {
  GetElementById("RiderNum").value = "";
  GetElementById("yesterday").checked = false;
  GetElementById("RiderNum").focus();
}

// validate bib number and time then add bib record to csv and tab record elements
function handleAddBib(bibAction) {
  const riderNum = GetElementById("RiderNum").value;
  if (riderNum && bibAction != undefined && bibAction.length > 0) {
    const time = formatTimeValue(GetElementById("TimeField").value);
    const dayOfMonth = getDayOfMonth(new Date());
    const locationVal = GetElementById("Location").value;
    const shortLoc = shortenLocation(locationVal);
    storePreviousRecord(riderNum, bibAction, time, dayOfMonth, shortLoc);
    updateCsvAndTabRecordsElement(
      riderNum,
      bibAction,
      time,
      dayOfMonth,
      shortLoc
    );
    ResetBibDataFields();
    cleanAndCountCsvData();
  } else {
    alert("Enter Runner/Bib number");
    GetElementById("RiderNum").focus();
  }
}

function elementValuesToLocalStorage() {
  const addressFormatted = GetElementById("address");
  localStorage.setItem("RTrackeradd", addressFormatted.value);
  const locationFormatted = GetElementById("Location");
  localStorage.setItem("RTrackerloc", locationFormatted.value);
  const eventTitleFormatted = GetElementById("EventTitle");
  localStorage.setItem("RTrackertitle", eventTitleFormatted.value);
  const msgNumFormatted = GetElementById("MessageNumber");
  localStorage.setItem("MessageNumber", msgNumFormatted.value);
  const locationLong = lengthenLocation(locationFormatted.value);
  const regulartitle =
    GetElementById("EventTitle").value +
    " " +
    locationLong +
    " Message #" +
    msgNumFormatted.value;
  GetElementById("msgsubject").value = regulartitle;
}

function shortenLocation(locationVal) {
  const underscoreIdx = locationVal.indexOf("_");
  return locationVal.slice(0, underscoreIdx);
}

function lengthenLocation(locationVal) {
  if (!locationVal) {
    return " ";
  }
  const underscoreIdx = locationVal.indexOf("_") + 1;
  return locationVal.slice(underscoreIdx);
}

// set form elements with the values stored in local storage
function setFormElementsWithLsValues() {
  const storedAddress = localStorage.getItem("RTrackeradd");
  GetElementById("address").value = storedAddress;
  const storedLocation = localStorage.getItem("RTrackerloc");

  if (storedLocation !== "") {
    GetElementById("Location").value = storedLocation;
  } else {
    GetElementById("Location").value = "--Choose a station--";
  }

  const storedTitle = localStorage.getItem("RTrackertitle");
  GetElementById("EventTitle").value = storedTitle;
  const storedMsgNumber = localStorage.getItem("MessageNumber");
  GetElementById("MessageNumber").value = storedMsgNumber;
  const locationLong = lengthenLocation(storedLocation);
  const regulartitle =
    "" + storedTitle + " " + locationLong + " Message #" + storedMsgNumber;
  GetElementById("msgsubject").value = regulartitle;
  GetElementById("MessageNumber").value = storedMsgNumber;
  copyPreviousRecordFromLsToElement();
}

function resetRiderNumMaxLengthToStoredOrDefault() {
  const storedMax = localStorage.getItem("maxRiderNumChars");
  const fallback = storedMax ? storedMax : MAX_RIDERNUM_CHARACTERS;
  document.getElementById("maxRiderNumChars").value = fallback;
  document.getElementById("RiderNum").setAttribute("maxlength", fallback);
}

function setRiderNumMaxLength(validatedMaxLength) {
  document
    .getElementById("RiderNum")
    .setAttribute("maxlength", validatedMaxLength);
  document.getElementById("maxRiderNumChars").value = validatedMaxLength;
  localStorage.setItem("maxRiderNumChars", validatedMaxLength);
}

function copyPreviousRecordFromLsToElement() {
  // if previous record key exists in local storage populate the element with string formatted value
  const previousItem = JSON.parse(localStorage.getItem("previousRecord"));

  if (previousItem !== null) {
    const prevRunner = previousItem.runner || "none";
    const prevAction = previousItem.action || "none";
    const prevTime = previousItem.time || "none";
    const prevDOM = previousItem.dayOfMonth || "none";
    const prevMsgNum = previousItem.messageNumber || "none";
    console.log(
      "previous Runner, Action, Time, DOM, MsgNum",
      prevRunner,
      prevAction,
      prevTime,
      prevDOM,
      prevMsgNum
    );
    const previousRecordString =
      "#" +
      previousItem.runner +
      ", " +
      previousItem.action +
      ", " +
      prevTime +
      ", D:" +
      previousItem.dayOfMonth +
      ", M#" +
      previousItem.messageNumber;
    GetElementById("endOfPriorBatch").value = previousRecordString;
  } else {
    // try to address occasional 'undefined' value
    GetElementById("endOfPriorBatch").value = "none";
  }
}

function clearParticipantData() {
  if (confirm("Clear all participant data?")) {
    GetElementById("TheData").value = "";
    GetElementById("TheCsvData").value = "";
    GetElementById("Inbtn").disabled = false;
    GetElementById("Outbtn").disabled = false;
    GetElementById("Dropbtn").disabled = false;
    GetElementById("entryCount").disabled = false;
    GetElementById("entryCount").value = "0";
    GetElementById("comment").value = "";
    ResetBibDataFields();
  }
}

// gets, formats, and returns the current clock time in HHMM format
function getCurrentTime() {
  const currentDateResult = new Date();
  const dateResultHoursOnly = currentDateResult.getHours();
  const dateResultMinutesOnly = currentDateResult.getMinutes();
  let currentHour = dateResultHoursOnly.toString();

  while (currentHour.length < 2) {
    currentHour = "0" + currentHour;
  }

  let currentMinute = dateResultMinutesOnly.toString();

  while (currentMinute.length < 2) {
    currentMinute = "0" + currentMinute;
  }

  return currentHour + ":" + currentMinute;
}

function addIn() {
  handleAddBib("IN");
}

function addOut() {
  handleAddBib("OUT");
}

function addDrop() {
  handleAddBib("DROP");
}

function storePreviousRecord(
  bibNumber,
  action,
  timestamp,
  dayOfMonth,
  location
) {
  // capture the current message number to store with the previous record
  // initialize a new object and store bibNumber, action, timestamp, dayOfMonth, and location variables as properties
  let previousRecord = {
    runner: bibNumber,
    action: action,
    time: timestamp,
    dayOfMonth: dayOfMonth,
    location: location,
    messageNumber: GetElementById("MessageNumber").value,
  };

  // store this object into localStorage
  localStorage.setItem("previousRecord", JSON.stringify(previousRecord));
}

// separator is either '\t' or ', ' depending on format needed
function formatBibRecord(pTime, tRunner, action, tTime, doM, loc, separator) {
  if (separator !== "\t" && separator !== ", ") {
    separator = "\t";
  }

  storePreviousRecord(tRunner, action, tTime, doM, loc);
  let newTime = tTime.toString();

  if (tTime.indexOf(":") > -1) {
    newTime = tTime.replace(":", "");
  }

  return (
    tRunner +
    separator +
    action +
    separator +
    newTime +
    separator +
    doM +
    separator +
    loc +
    "\n" +
    pTime
  );
}

// converts bib records in TheData element from tab-separated to comma-separated values
function convertRawBibRecordsToArray() {
  const bibRecordsRaw = GetElementById("TheData").value;
  const bibRecordsArray = bibRecordsRaw.split("\n");
  const cleanBibRecordsArray = [];

  bibRecordsArray.forEach((record) => {
    if (record.length > 0) {
      const csvRecord = record.replace(/\t/g, ", ");
      cleanBibRecordsArray.push(csvRecord);
    }
  });

  return cleanBibRecordsArray;
}

function createJsonObjectFromFormElements(cleanBibRecordsArray) {
  const jsonObject = {
    FormVersion: GetElementById("FormVersion").value,
    // add bib number character count upper restriction to array for file storage
    BibNumberLengthMax: GetElementById("maxRiderNumChars").value,
    EventTitle: GetElementById("EventTitle").value,
    MessageNumber: GetElementById("MessageNumber").value,
    address: GetElementById("address").value,
    Location: GetElementById("Location").value,
    msgsubject: GetElementById("msgsubject").value,
    entryCount: GetElementById("entryCount").value,
    Comment: `Comment: ${GetElementById("comment").value}`,
    TheCsvData: cleanBibRecordsArray,
  };

  return jsonObject;
}

function saveTextAsFile() {
  let fileNameToSaveAs = "Bigfoot Bib Data " + dateStampForFile() + ".txt";
  fileNameToSaveAs = prompt("", fileNameToSaveAs);
  const cleanBibRecords = convertRawBibRecordsToArray();
  const formElementsAsJson = createJsonObjectFromFormElements(cleanBibRecords);
  const textToWrite = JSON.stringify(formElementsAsJson, null, 2);

  let textFileAsBlob = new Blob([textToWrite], {
    type: "application/json",
  });

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);
  } else {
    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = function (e) {
      document.body.removeChild(e.target);
    };
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}

function dateStampForFile() {
  const d = new Date();
  const thisyear = d.getFullYear();
  let thismonth = d.getMonth() + 1;
  let thisday = d.getDate();
  const thishour = (d.getHours() < 10 ? "0" : "") + d.getHours();
  const thisminute = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();

  if (thismonth < 10) {
    thismonth = "0" + thismonth;
  }

  if (thisday < 10) {
    thisday = "0" + thisday;
  }

  return (
    "" +
    thisyear +
    "-" +
    thismonth +
    "-" +
    thisday +
    " " +
    thishour +
    "_" +
    thisminute
  );
}

// captures each form element value in a JSON object and stores it in hidden element 'parseme'
function storeFormValuesToHiddenElement() {
  const FormVersion = GetElementById("FormVersion").value;
  const EventTitle = GetElementById("EventTitle").value;
  const MessageNumber = GetElementById("MessageNumber").value;
  const address = GetElementById("address").value;
  const Location = GetElementById("Location").value;
  const msgsubject = GetElementById("msgsubject").value;
  const entryCount = GetElementById("entryCount").value;
  const TheData = GetElementById("TheData").value;
  const Comment = GetElementById("comment").value;
  const previousRecord = JSON.parse(localStorage.getItem("previousRecord"));

  const formObject = JSON.stringify({
    FormVersion,
    EventTitle,
    MessageNumber,
    address,
    Location,
    msgsubject,
    entryCount,
    TheData,
    Comment,
    previousRecord,
  });

  GetElementById("parseme").value = formObject;
}

// takes values stored in parseme hidden element, iterates through form elements and populates them with values
function populateForm(jsonStringData) {
  if (jsonStringData === undefined || jsonStringData.length < 1) {
    console.log("jsonStringData is empty. Exiting function.");
  } else {
    GetElementById("EventTitle").value = jsonStringData.EventTitle;
    GetElementById("MessageNumber").value = jsonStringData.MessageNumber
      ? jsonStringData.MessageNumber
      : 1;
    GetElementById("address").value = jsonStringData.address
      ? jsonStringData.address
      : "";
    GetElementById("Location").value = jsonStringData.Location
      ? jsonStringData.Location
      : "";
    GetElementById("msgsubject").value = jsonStringData.msgsubject
      ? jsonStringData.msgsubject
      : "";
    GetElementById("entryCount").value = jsonStringData.entryCount
      ? jsonStringData.entryCount
      : 0;
    GetElementById("comment").value = jsonStringData.Comment
      ? jsonStringData.Comment
      : "";
    GetElementById("endOfPriorBatch").value = jsonStringData.previousRecord
      ? jsonStringData.previousRecord
      : "";

    const theCsvDataRaw = jsonStringData.TheCsvData;
    const csvData = theCsvDataRaw.join("\n");
    GetElementById("TheCsvData").value = csvData;

    const tabbedData = theCsvDataRaw
      .map((item) => {
        if (item !== undefined && item.length > 0) {
          return item.replace(/, /g, "\t");
        }
      })
      .join("\n");

    GetElementById("TheData").value = tabbedData;
    copyPreviousRecordFromLsToElement();
  }
}

function SaveData() {
  storeFormValuesToHiddenElement();
  elementValuesToLocalStorage(); // update localstorage values
  saveTextAsFile();
}

function incrementMsgNum() {
  const formMsgNum = Number.parseInt(GetElementById("MessageNumber").value, 10);
  GetElementById("MessageNumber").value = formMsgNum ? formMsgNum + 1 : 1;
  elementValuesToLocalStorage();
}

window.addEventListener("load", function () {
  const formVersion = "3.0.dev";
  document.getElementById("thisVersion").innerText = "Version " + formVersion;
  document.getElementById("FormVersion").value = formVersion;
  localStorage.setItem("Form Version", formVersion);

  // set tabindex to -1 on all focusable elements within #pop1
  getFocusableElements("pop1").forEach((el) => {
    el.setAttribute("tabindex", "-1");
  });

  // Check the support for the File API
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    const fileSelected = GetElementById("txtfiletoread");

    // begin fileSelected Change Event Listener
    fileSelected.addEventListener("change", function (e) {
      // Set the extension for the file
      const fileExtension = /text.*/;
      // Get the file object
      const fileTobeRead = fileSelected.files[0];
      // Check if the extension matches
      if (fileTobeRead.type.match(fileExtension)) {
        // Initialize the FileReader object to read the file data
        const fileReader = new FileReader();

        fileReader.onload = function (e) {
          document.getElementById("parseme").value = fileReader.result;

          try {
            const jsonData = JSON.parse(
              document.getElementById("parseme").value
            );
            // console.log('filereader.onload json parse of parseme element value: ', jsonData);
            populateForm(jsonData);
          } catch (err) {
            console.error(
              "An error occurred while parsing the JSON data: ",
              err
            );
          }
        };

        fileReader.readAsText(fileTobeRead);
      } else {
        alert("Please select a text file");
      }
    });
    // end fileSelected Change Event Listener
  } else {
    alert("Files are not supported");
  }

  resetRiderNumMaxLengthToStoredOrDefault();
  const currTime = getCurrentTime();
  GetElementById("TimeField").value = formatTimeValue(currTime); // only set computer time at form load
  setFormElementsWithLsValues();
});

// USE THIS SECTION to add event listeners to form elements
const defaultBibValue = "000";
const minFieldLength = 1;
const timeFieldElement = GetElementById("TimeField");
const riderNumberElement = GetElementById("RiderNum");
const inBtnElement = GetElementById("Inbtn");
const outBtnElement = GetElementById("Outbtn");
const dropBtnElement = GetElementById("Dropbtn");
const yesterdayElement = GetElementById("yesterday");

// add event listener to csvDataElement: call functions to clean and handle existing csv data
GetElementById("TheCsvData").addEventListener("blur", function () {
  cleanAndCountCsvData();
  handleCsvDataEdited();
});

// add event listener to Bib Time field: call functions to sanitize and pad user input
timeFieldElement.addEventListener("blur", function () {
  GetElementById("TimeField").value = formatTimeValue(this.value);
});

// add event listener to Rider Number field: set default value if empty or set current clock time to Time field
riderNumberElement.addEventListener("blur", function () {
  this.value = this.value.trim();
  // set default value if field is empty
  if (this.value.length < minFieldLength) {
    this.value = defaultBibValue;
  }

  this.value = this.value.toUpperCase();
});

// add an event listener to the '+', '=', `-`, and `/` keys that call handleAddBib() function only when timeField, RiderNumber, Yesterday input elements, or IN, OUT, or DROP buttons are focused
const focusableElements = [
  timeFieldElement,
  riderNumberElement,
  yesterdayElement,
  inBtnElement,
  outBtnElement,
  dropBtnElement,
];
const keyActionMap = {
  "+": "IN",
  "=": "IN",
  "-": "OUT",
  "/": "DROP",
};
document.addEventListener("keydown", function (event) {
  const activeElement = document.activeElement;
  if (focusableElements.includes(activeElement)) {
    const kAMValue = keyActionMap[event.key];
    if (kAMValue !== undefined) {
      event.preventDefault(); // prevent key character from being entered in the form
      handleAddBib(kAMValue);
    }
  }
});

// add event listeners to the IN, OUT, and DROP buttons
document.addEventListener("click", function (event) {
  if (event.target === inBtnElement) {
    event.preventDefault();
    handleAddBib("IN");
  } else if (event.target === outBtnElement) {
    event.preventDefault();
    handleAddBib("OUT");
  } else if (event.target === dropBtnElement) {
    event.preventDefault();
    handleAddBib("DROP");
  }
});

// Add event listeners for "Form Information - READ" and "Close Pop-up" buttons
document
  .getElementById("formInfoReadBtn")
  .addEventListener("click", function () {
    getFocusableElements("pop1").forEach((el) => {
      el.removeAttribute("tabindex");
    });
    location.href = "#pop1";
  });
document.getElementById("closePopBtn").addEventListener("click", function () {
  getFocusableElements("pop1").forEach((el) => {
    el.setAttribute("tabindex", "-1");
  });
  location.href = "#close";
});

// Add event listener for maxRiderNumChars input field
document
  .getElementById("maxRiderNumChars")
  .addEventListener("change", function () {
    const parsedMaxLength = Number.parseInt(this.value, 10);
    let validatedMaxLength = MAX_RIDERNUM_CHARACTERS;
    if (
      Number.isSafeInteger(parsedMaxLength) &&
      parsedMaxLength >= MIN_RIDERNUM_CHARACTERS &&
      parsedMaxLength <= MAX_RIDERNUM_CHARACTERS
    ) {
      validatedMaxLength = parsedMaxLength;
      setRiderNumMaxLength(validatedMaxLength);
    } else {
      console.log(
        "Please enter a valid positive integer (1-" +
          MAX_RIDERNUM_CHARACTERS +
          ") for Max Bib Characters."
      );
      // Reset to previous valid value from localStorage or default
      resetRiderNumMaxLengthToStoredOrDefault();
    }
    // Also clear the RiderNum input field to avoid invalid length
    document.getElementById("RiderNum").value = "";
  });

// handle increment message number
document
  .getElementById("incrMsgNum")
  .addEventListener("click", incrementMsgNum);

// handle Save data button click
document.getElementById("savebtn").addEventListener("click", SaveData);

// handle load race data button click
document.getElementById("loadbtn").addEventListener("click", function () {
  document.getElementById("txtfiletoread").click();
});

// handle clear participant data button click
document
  .getElementById("doclear")
  .addEventListener("click", clearParticipantData);

// handle event title change
document
  .getElementById("EventTitle")
  .addEventListener("change", elementValuesToLocalStorage);

// handle storing element values to local storage
document
  .getElementById("MessageNumber")
  .addEventListener("change", elementValuesToLocalStorage);

// handle addressee change stores to localstorage
document
  .getElementById("address")
  .addEventListener("change", elementValuesToLocalStorage);

// handle location change stores to localstorage
document
  .getElementById("Location")
  .addEventListener("change", elementValuesToLocalStorage);
