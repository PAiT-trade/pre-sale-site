"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const CountdownTimer: React.FC<{ targetDate: string }> = ({
  targetDate,
}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    } = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, calculateTimeLeft]);

  return (
    <CountdownTimerContainer>
      <TimerContainer>
        <TimeBox>
          <TimeLabel>Days</TimeLabel>
          <TimeValue>{timeLeft.days || "0"}</TimeValue>
        </TimeBox>
        <TimeBox>
          <TimeLabel>Hours</TimeLabel>
          <TimeValue>{timeLeft.hours || "0"}</TimeValue>
        </TimeBox>
        <TimeBox>
          <TimeLabel>Minutes</TimeLabel>
          <TimeValue>{timeLeft.minutes || "0"}</TimeValue>
        </TimeBox>
        <TimeBox>
          <TimeLabel>Seconds</TimeLabel>
          <TimeValue>{timeLeft.seconds || "0"}</TimeValue>
        </TimeBox>
      </TimerContainer>
      <LabelUntilTGE>Until TGE</LabelUntilTGE>
    </CountdownTimerContainer>
  );
};

export const CountdownTimerContainer = styled.div`
  background-color: #1d2437;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: bold;
`;

const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const TimeValue = styled.div`
  color: #e0e5f0;
  padding: 10px;
  border-radius: 8px;
  min-width: 60px;
  text-align: center;
`;

const TimeLabel = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: #7c8cae;
`;

const LabelUntilTGE = styled(TimeLabel)`
  color: #7c8cae;
  font-size: 14px;
  font-weight: 600;
`;
