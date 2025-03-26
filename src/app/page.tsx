import { PrimeReactProvider } from "primereact/api";
import { Fieldset } from "primereact/fieldset";

import { ActivitiesChart } from "@/components/ActivitiesChart";
import { loadActivities } from "@/activities/loadActivities";

import styles from './page.module.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

export default async function Home() {
  const activities = await loadActivities();

  return (
    <PrimeReactProvider>
      <div className="app">
        <h1>Senior Developer Skills Tree</h1>
        <Fieldset
          className={styles.skillsExplanations}
          legend="Each skill have its own levels"
          collapsed
          toggleable
        >
          <ol>
            <li>Below Expectations</li>
            <li>Sometimes Achieving Expectations</li>
            <li>Meeting Expectations</li>
            <li>Exceeding Expectations</li>
            <li>Setting a New Standard</li>
          </ol>
        </Fieldset>
        <ActivitiesChart activitiesGroups={activities} />
      </div>
    </PrimeReactProvider>
  );
}
