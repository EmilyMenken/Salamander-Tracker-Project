export default function UsageInstructions() {
  return (
    <div>
      <h2>How to Use This Application</h2>

      <h3>1. Select a Video</h3>
      <p>
        Start on the dashboard page. Use the dropdown menu to select a video
        from the list. You must select a video before continuing.
      </p>

      <h3>2. Binarize Setup</h3>
      <p>
        After selecting a video, click the Binarize button to go to the
        binarization page.
      </p>
      <p>
        Choose a target color and set a threshold value. The preview will
        update automatically so you can see how the binarization will look.
      </p>

      <h3>3. Start Processing</h3>
      <p>
        When you are satisfied with your settings, click the Process button.
        This will start the binarization process.
      </p>

      <h3>4. Wait for Completion</h3>
      <p>
        You will be redirected to the processing page. A job status message will
        display the current progress. While processing, the status will show
        "Processing".
      </p>
      <p>
        Once the video is finished processing, the status will change to "Done".
      </p>

      <h3>5. Download Your Results</h3>
      <p>
        When processing is complete, a download link will appear. Click the link
        to download the CSV file containing the binarized video data.
      </p>
    </div>
  );
}
