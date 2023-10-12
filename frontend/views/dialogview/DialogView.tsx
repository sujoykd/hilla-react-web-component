import { Button } from "@hilla/react-components/Button.js";
import { Dialog } from "@hilla/react-components/Dialog.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { useState } from "react";

import styles from "./DialogView.module.css";

export default function DialogView() {
  const [dialogOpened, setDialogOpened] = useState(false);

  return (
    <>
      <Dialog
        headerTitle="New employee"
        draggable
        opened={dialogOpened}
        onOpenedChanged={({ detail }) => {
          setDialogOpened(detail.value);
        }}
        footerRenderer={() => (
          <>
            <Button onClick={() => setDialogOpened(false)}>Cancel</Button>
            <Button theme="primary" onClick={() => setDialogOpened(false)}>
              Add
            </Button>
          </>
        )}
      >
        <VerticalLayout
          className={`${styles.world}`}
          style={{ alignItems: "stretch", width: "18rem", maxWidth: "100%" }}
        >
          <TextField label="First name" />
          <TextField label="Last name" />
        </VerticalLayout>
      </Dialog>

      <Button onClick={() => setDialogOpened(true)}>Show dialog</Button>
    </>
  );
}
