import React, { useEffect, useState } from "react";
import { getPlants } from "../services/plantApi";
import "../css/PlantCare.css";

const Dashboard = () => {
  const [plantList, setPlantList] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await getPlants();
      setPlantList(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const getFrequencyDays = (frequency) => {
    if (!frequency) return null;

    const value = frequency.toString().trim().toLowerCase();

    if (
      value === "daily" ||
      value === "every day" ||
      value === "everyday"
    ) {
      return 1;
    }

    if (
      value === "weekly" ||
      value === "every week"
    ) {
      return 7;
    }

    if (
      value === "monthly" ||
      value === "every month"
    ) {
      return 30;
    }

    const daysMatch = value.match(/(\d+)\s*days?/);

    if (daysMatch) {
      return parseInt(daysMatch[1], 10);
    }

    const weeksMatch = value.match(/(\d+)\s*weeks?/);

    if (weeksMatch) {
      return parseInt(weeksMatch[1], 10) * 7;
    }

    const monthsMatch = value.match(/(\d+)\s*months?/);

    if (monthsMatch) {
      return parseInt(monthsMatch[1], 10) * 30;
    }

    return null;
  };


  const getToday = () => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return today;
  };

  const getNextCareDate = (lastDate, frequency) => {
    if (!lastDate || !frequency) {
      return null;
    }

    const days = getFrequencyDays(frequency);

    if (!days) {
      return null;
    }

    const date = new Date(lastDate);

    if (isNaN(date.getTime())) {
      return null;
    }

    date.setDate(date.getDate() + days);

    date.setHours(0, 0, 0, 0);

    return date;
  };

  const isDueToday = (lastDate, frequency) => {
    const nextDate = getNextCareDate(
      lastDate,
      frequency
    );

    if (!nextDate) {
      return false;
    }

    return nextDate.getTime() <= getToday().getTime();
  };

  const getDaysUntil = (date) => {
    if (!date) {
      return null;
    }

    const today = getToday();

    const careDate = new Date(date);

    careDate.setHours(0, 0, 0, 0);

    const difference =
      careDate.getTime() - today.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };


  const wateringPlants = plantList.filter((plant) =>
    isDueToday(
      plant.lastWateredDate,
      plant.wateringFrequency
    )
  );

  const fertilizingPlants = plantList.filter((plant) =>
    isDueToday(
      plant.lastFertilizedDate,
      plant.fertilizingFrequency
    )
  );


  const careToday = [
    ...wateringPlants.map((plant) => ({
      id: plant.id,
      name: plant.plantName,
      type: "Watering",
      icon: "💧",
    })),

    ...fertilizingPlants.map((plant) => ({
      id: plant.id,
      name: plant.name,
      type: "Fertilizing",
      icon: "🌱",
    })),
  ];


  const upcomingPlants = plantList
    .map((plant) => {
      const wateringDate = getNextCareDate(
        plant.lastWateredDate,
        plant.wateringFrequency
      );

      const fertilizingDate = getNextCareDate(
        plant.lastFertilizedDate,
        plant.fertilizingFrequency
      );

      const possibleDates = [
        wateringDate,
        fertilizingDate,
      ].filter(Boolean);

      if (possibleDates.length === 0) {
        return null;
      }

      const nextDate = possibleDates.sort(
        (a, b) => a - b
      )[0];

      return {
        ...plant,
        nextDate,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.nextDate - b.nextDate)
    .slice(0, 5);

  return (
    <main className="main-content">

      <section className="welcome-section">
        <div>
          <p className="welcome-label">
            PLANT CARE DASHBOARD
          </p>

          <h1>
            Good day, Plant Parent 🌱
          </h1>

          <p className="welcome-text">
            Keep track of watering, fertilizing,
            and the overall care of your plants
            from one place.
          </p>
        </div>
      </section>

      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">
            🌿
          </div>

          <div>
            <p>Total Plants</p>

            <h2>
              {plantList.length}
            </h2>

            <span className="stat-description">
              In your collection
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            💧
          </div>

          <div>
            <p>Watering Due</p>

            <h2>
              {wateringPlants.length}
            </h2>

            <span className="stat-description">
              Need attention today
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            🌱
          </div>

          <div>
            <p>Fertilizing Due</p>

            <h2>
              {fertilizingPlants.length}
            </h2>

            <span className="stat-description">
              Need attention today
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            📅
          </div>

          <div>
            <p>Upcoming Care</p>

            <h2>
              {upcomingPlants.length}
            </h2>

            <span className="stat-description">
              Next scheduled plants
            </span>
          </div>
        </div>

      </section>


      <section className="dashboard-section">

        <div className="dashboard-section-heading">

          <div>
            <p className="section-label">
              TODAY
            </p>

            <h2>
              Plant Care Tasks
            </h2>
          </div>

          <span className="task-count">
            {careToday.length}{" "}
            {careToday.length === 1
              ? "Task"
              : "Tasks"}
          </span>

        </div>

        {careToday.length === 0 ? (

          <div className="dashboard-empty">

            <div className="dashboard-empty-icon">
              🌿
            </div>

            <h3>
              You're all caught up!
            </h3>

            <p>
              No watering or fertilizing
              tasks are due today.
            </p>

          </div>

        ) : (

          <div className="care-list">

            {careToday.map((task, index) => (

              <div
                className="care-item"
                key={`${task.type}-${task.id}-${index}`}
              >

                <div className="care-item-icon">
                  {task.icon}
                </div>

                <div className="care-item-content">

                  <h3>
                    {task.name}
                  </h3>

                  <p>
                    {task.type} is due today
                  </p>

                </div>

                <span className="care-badge">
                  {task.type === "Watering"
                    ? "Water"
                    : "Fertilize"}
                </span>

              </div>

            ))}

          </div>
        )}

      </section>

      {/* =========================
          UPCOMING CARE
      ========================= */}

      <section className="dashboard-section">

        <div className="dashboard-section-heading">

          <div>
            <p className="section-label">
              SCHEDULE
            </p>

            <h2>
              Upcoming Plant Care
            </h2>
          </div>

        </div>

        {upcomingPlants.length === 0 ? (

          <div className="dashboard-empty small">

            <div className="dashboard-empty-icon">
              📅
            </div>

            <h3>
              No schedule available
            </h3>

            <p>
              Add watering and fertilizing
              information to see your
              upcoming care schedule.
            </p>

          </div>

        ) : (

          <div className="upcoming-list">

            {upcomingPlants.map((plant) => {

              const days = getDaysUntil(
                plant.nextDate
              );

              return (
                <div
                  className="upcoming-item"
                  key={plant.id}
                >

                  <div className="upcoming-plant-icon">
                    🌿
                  </div>

                  <div className="upcoming-plant-info">

                    <h3>
                      {plant.name}
                    </h3>

                    <p>
                      Next care:{" "}
                      {formatDate(
                        plant.nextDate
                      )}
                    </p>

                  </div>

                  <div className="upcoming-days">

                    {days === 0
                      ? "Today"
                      : days === 1
                      ? "Tomorrow"
                      : days > 1
                      ? `In ${days} days`
                      : "Due"}

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </section>

    </main>
  );
};

export default Dashboard;