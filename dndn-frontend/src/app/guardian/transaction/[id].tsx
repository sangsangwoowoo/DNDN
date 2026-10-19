import { useCallback, useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TransferReviewCard from "@/components/TransferReviewCard";
import {
  getGuardianTransfer,
  type TransferResponse,
} from "@/services/transfer";
import { getApiErrorMessage } from "@/services/auth";

export default function GuardianTransferReview() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [transfer, setTransfer] = useState<TransferResponse | null>(null);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    try {
      const result = await getGuardianTransfer(Number(id));
      setTransfer(result);
      setError("");
    } catch (err) {
      setTransfer(null);
      setError(getApiErrorMessage(err, "거래 정보를 불러오지 못했어요."));
    }
  }, [id]);
  useFocusEffect(
    useCallback(() => {
      void refresh();
      const timer = setInterval(() => void refresh(), 15000);
      return () => clearInterval(timer);
    }, [refresh]),
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F8FA" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 20 }}>
          가족 송금 확인
        </Text>
        <Text style={{ fontSize: 17, lineHeight: 26, marginBottom: 20 }}>
          가족과 직접 연락해 송금 이유와 받는 계좌를 확인해 주세요.
        </Text>
        {!!error && (
          <Text style={{ color: "#C43D3D", marginBottom: 16 }}>{error}</Text>
        )}
        <TouchableOpacity onPress={() => void refresh()}>
          <Text style={{ fontSize: 17, marginBottom: 20 }}>새로고침</Text>
        </TouchableOpacity>
        {transfer ? (
          <TransferReviewCard transfer={transfer} guardian refresh={refresh} />
        ) : (
          !error && <Text>불러오는 중…</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
