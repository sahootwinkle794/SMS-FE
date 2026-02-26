"use client"
import { Box, Flex, Group, Text, TextInput } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  length?: number;
  onComplete?: (otp: string) => void;
  showSubmit?: boolean;
  timerSeconds?: number;
  onResend?: () => void;
};

const OtpInput = ({
  length = 4,
  onComplete,
  timerSeconds = 30,
  onResend,
}: Props) => {
  const [values, setValues] = useState<string[]>(() => Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // TIMER STATES
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [canResend, setCanResend] = useState(false);

  // Auto focus first input
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // TIMER EFFECT — FIXED
  useEffect(() => {
    if (canResend) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [canResend]);

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const setValueAt = (index: number, val: string) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const digit = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);

    if (!digit) {
      setValueAt(idx, "");
      return;
    }

    setValueAt(idx, digit);

    if (idx < length - 1) focusInput(idx + 1);

    // Check complete OTP
    setTimeout(() => {
      const otp = values.map((v, i) => (i === idx ? digit : v));
      if (otp.every((c) => c !== "")) onComplete?.(otp.join(""));
    }, 0);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      if (values[idx] === "" && idx > 0) {
        setValueAt(idx - 1, "");
        focusInput(idx - 1);
      } else {
        setValueAt(idx, "");
      }
    }

    if (e.key === "ArrowLeft" && idx > 0) focusInput(idx - 1);
    if (e.key === "ArrowRight" && idx < length - 1) focusInput(idx + 1);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, length)
      .split("");

    if (digits.length === 0) return;

    setValues(() => {
      const next = Array(length).fill("");
      for (let i = 0; i < digits.length; i++) next[i] = digits[i];
      return next;
    });

    const last = Math.min(digits.length - 1, length - 1);
    focusInput(last === length - 1 ? last : last + 1);

    if (digits.length === length) onComplete?.(digits.join(""));
  };

  const handleResend = () => {
    setValues(Array(length).fill(""));
    setTimeLeft(timerSeconds);
    setCanResend(false);
    inputsRef.current[0]?.focus();
    onResend?.();
  };

  return (
    <Box>
      <Text size="sm" mb="xs">
        Enter the OTP we sent to your Mobile Number
      </Text>

      <Group gap="xs">
        {Array.from({ length }).map((_, idx) => (
          <TextInput
            key={idx}
            maxLength={1}
            value={values[idx]}
            inputMode="numeric"
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            ref={(el) => {
              inputsRef.current[idx] = el;
            }}
            styles={(theme) => ({
              input: {
                width: 38,
                height: 38,
                textAlign: "center",
                fontSize: 18,
                backgroundColor: "#F1F3F6",
                      borderColor: theme.colors.primary[4],
                      "&:focus, &:focusWithin": {
                        borderColor: theme.colors.primary[6],
                      },
              },
            })}
          />
        ))}
      </Group>

      {/* TIMER + RESEND */}

      <Flex justify="flex-end" mt="md" align={'center'}>
        <Text mr={5}>{`Didn't get the code?`}</Text>
        {canResend ? (
          <Text
            size="sm"
            c="primary.5"
            fw={600}
            style={{ cursor: "pointer" }}
            onClick={handleResend}
          >
            Resend OTP
          </Text>
        ) : (
          <Text size="sm" c="gray.6">
            Resend OTP in {timeLeft}s
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default OtpInput;
