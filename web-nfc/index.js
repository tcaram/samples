scanButton.addEventListener("click", async () => {
  log("User clicked scan button");

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    log("> Scan started");

    ndef.addEventListener("readingerror", () => {
      log("Argh! Cannot read data from the NFC tag. Try another one?");
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      log(`> Serial Number: ${serialNumber}`);
      log(`> Records: (${message.records.length})`);

      message.records.forEach((record, index) => {
        log(`Record ${index + 1}:`);
    
        if (record.recordType === 'text') {
          const textDecoder = new TextDecoder();
          const text = textDecoder.decode(record.data);
          log(`Text Record Data: ${text}`);
        } else if (record.recordType === 'url') {
          // Handle URL record type
          const url = record.data;
          log(`URL Record Data: ${url}`);
        } else {
          // Handle other record types as needed
          log(`Record Data: ${record.data}`);
        }
      });
    });
  } catch (error) {
    log("Argh! " + error);
  }
});

writeButton.addEventListener("click", async () => {
  log("User clicked write button");

  try {
    const ndef = new NDEFReader();
    await ndef.write("Hello world!");
    log("> Message written");
  } catch (error) {
    log("Argh! " + error);
  }
});

makeReadOnlyButton.addEventListener("click", async () => {
  log("User clicked make read-only button");

  try {
    const ndef = new NDEFReader();
    await ndef.makeReadOnly();
    log("> NFC tag has been made permanently read-only");
  } catch (error) {
    log("Argh! " + error);
  }
});
