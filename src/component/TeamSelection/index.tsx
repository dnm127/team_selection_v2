import { blue } from "@radix-ui/colors";
import { Box, Button, Heading, Select, Switch, Text } from "@radix-ui/themes";
import { useCallback, useMemo, useRef, useState } from "react";
import { LEVEL, LEVELS, TEAM_TYPE, TEAMS } from "../../helper/constant";
import { getRandomIndex } from "../../helper/utils";
import DividedCircle from "../DividedCircle";

const TeamSelection = () => {
  const [type, setType] = useState<TEAM_TYPE>(TEAM_TYPE.CLUB);
  const [level, setLevel] = useState<LEVEL>(LEVEL.FIVE_STARS);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState<number>(-1);
  const [finalResult, setFinalResult] = useState<string>("");
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const teams = useMemo(() => {
    return TEAMS[type][level];
  }, [type, level]);

  const handleChangeLevel = (value: string) => setLevel(value as LEVEL);

  const startSpinning = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setFinalResult("");
    setCurrentHighlight(-1);

    const totalDuration = 5000; // 10 seconds
    let elapsed = 0;
    let currentSpeed = 50; // Start with 50ms intervals

    const spin = () => {
      if (elapsed >= totalDuration) {
        // Final selection
        const finalIndex = getRandomIndex(teams);
        setCurrentHighlight(finalIndex);
        setFinalResult(teams[finalIndex]);
        setIsSpinning(false);

        if (spinTimeoutRef.current) {
          clearTimeout(spinTimeoutRef.current);
          spinTimeoutRef.current = null;
        }
        if (spinIntervalRef.current) {
          clearTimeout(spinIntervalRef.current);
          spinIntervalRef.current = null;
        }
        return;
      }

      // Get random index and highlight it
      const randomIndex = getRandomIndex(teams);
      setCurrentHighlight(randomIndex);

      // Calculate slowdown - speed decreases exponentially towards the end
      const progress = elapsed / totalDuration;
      const slowdownFactor = Math.pow(progress, 2); // Exponential slowdown
      currentSpeed = 50 + slowdownFactor * 450; // Speed goes from 50ms to 500ms

      elapsed += currentSpeed;

      spinTimeoutRef.current = setTimeout(spin, currentSpeed);
    };

    spin();
  }, [isSpinning, teams]);

  const resetSpin = useCallback(() => {
    setIsSpinning(false);
    setCurrentHighlight(-1);
    setFinalResult("");

    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
      spinTimeoutRef.current = null;
    }
    if (spinIntervalRef.current) {
      clearTimeout(spinIntervalRef.current);
      spinIntervalRef.current = null;
    }

    window.location.reload();
  }, []);

  return (
    <Box width="100%">
      <Box width="100%" style={{ textAlign: "center", marginBottom: 20 }}>
        <Heading as="h2">Chọn đội đi mấy con gà</Heading>
      </Box>

      <Box
        width="100%"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <DividedCircle
          sections={teams}
          size={400}
          highlightedIndex={currentHighlight}
        />

        {finalResult && (
          <Box
            style={{
              padding: "20px",
              backgroundColor: blue.blue10,
              borderRadius: "10px",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <Text size="3" weight="light">
              🎉 Đây nhé:
            </Text>
            <Text size="3" weight="bold">
              {" "}
              {finalResult}
              {" 🎉"}
            </Text>
          </Box>
        )}

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Text size="4" weight="light">
              CLB
            </Text>
            <Switch
              color="indigo"
              checked={type === TEAM_TYPE.NATIONAL}
              onCheckedChange={(checked) =>
                setType(checked ? TEAM_TYPE.NATIONAL : TEAM_TYPE.CLUB)
              }
              radius="large"
            />
            <Text size="4" weight="light">
              Tuyển
            </Text>
          </Box>
          <Select.Root defaultValue={level} onValueChange={handleChangeLevel}>
            <Select.Trigger variant="surface" />
            <Select.Content>
              {LEVELS.map((item) => (
                <Select.Item key={item.value} value={item.value}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Box>
        <Box style={{ display: "flex", gap: "10px" }}>
          <Button
            size="3"
            variant="solid"
            onClick={startSpinning}
            disabled={isSpinning}
          >
            {isSpinning ? "Đang quay..." : "Quay luôn"}
          </Button>

          {finalResult && (
            <Button size="3" variant="outline" onClick={resetSpin}>
              Reset
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TeamSelection;
