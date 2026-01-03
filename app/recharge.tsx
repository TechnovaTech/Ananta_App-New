import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useTheme } from '../contexts/ThemeContext';

interface RechargePlan {
  id: string;
  name: string;
  price: number;
  coins: number;
  popular?: boolean;
}

interface RechargeHistory {
  id: string;
  date: string;
  planName: string;
  amount: number;
  status: 'Success' | 'Failed';
  coinsAdded: number;
}

type PaymentMethod = 'UPI' | 'Card' | 'Wallet';
type RechargeStep = 'plans' | 'payment' | 'order' | 'complete' | 'history';

export default function RechargeScreen() {
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState<RechargeStep>('plans');
  const [selectedPlan, setSelectedPlan] = useState<RechargePlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const rechargePlans: RechargePlan[] = [
    { id: '1', name: 'Basic', price: 50, coins: 100 },
    { id: '2', name: 'Silver', price: 100, coins: 250, popular: true },
    { id: '3', name: 'Gold', price: 200, coins: 600 },
    { id: '4', name: 'Platinum', price: 500, coins: 1500 },
    { id: '5', name: 'Diamond', price: 1000, coins: 3500 },
  ];

  const rechargeHistory: RechargeHistory[] = [
    { id: '1', date: '2025-11-29', planName: 'Gold', amount: 200, status: 'Success', coinsAdded: 600 },
    { id: '2', date: '2025-11-28', planName: 'Silver', amount: 100, status: 'Failed', coinsAdded: 0 },
    { id: '3', date: '2025-11-27', planName: 'Basic', amount: 50, status: 'Success', coinsAdded: 100 },
    { id: '4', date: '2025-11-26', planName: 'Platinum', amount: 500, status: 'Success', coinsAdded: 1500 },
    { id: '5', date: '2025-11-25', planName: 'Silver', amount: 100, status: 'Success', coinsAdded: 250 },
    { id: '6', date: '2025-11-24', planName: 'Gold', amount: 200, status: 'Failed', coinsAdded: 0 },
    { id: '7', date: '2025-11-23', planName: 'Basic', amount: 50, status: 'Success', coinsAdded: 100 },
  ];

  const handlePlanSelect = (plan: RechargePlan) => {
    setSelectedPlan(plan);
  };

  const handleProceedToPayment = () => {
    if (!selectedPlan) return;
    setCurrentStep('payment');
  };

  const handleCreateOrder = async () => {
    if (!selectedPlan) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newOrderId = Math.floor(Math.random() * 1000) + 100;
      setOrderId(newOrderId.toString());
      setCurrentStep('order');
    } catch (error) {
      Alert.alert('Error', 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const handleCompletePayment = async () => {
    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      const success = Math.random() > 0.3; // 70% success rate
      setPaymentSuccess(success);
      setCurrentStep('complete');
    } catch (error) {
      setPaymentSuccess(false);
      setCurrentStep('complete');
    } finally {
      setLoading(false);
    }
  };

  const renderPlansSection = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Available Recharge Plans</Text>
      
      {rechargePlans.map((plan) => (
        <TouchableOpacity
          key={plan.id}
          style={[
            styles.planCard,
            {
              backgroundColor: isDark ? '#333' : 'white',
              borderColor: selectedPlan?.id === plan.id ? Colors.light.primary : (isDark ? '#555' : '#e0e0e0'),
              borderWidth: selectedPlan?.id === plan.id ? 2 : 1,
            }
          ]}
          onPress={() => handlePlanSelect(plan)}
        >
          {plan.popular && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>POPULAR</Text>
            </View>
          )}
          
          <View style={styles.planContent}>
            <View style={styles.planInfo}>
              <Text style={[styles.planName, { color: isDark ? 'white' : '#333' }]}>{plan.name}</Text>
              <Text style={[styles.planPrice, { color: Colors.light.primary }]}>₹{plan.price}</Text>
            </View>
            
            <View style={styles.planBenefits}>
              <View style={styles.coinInfo}>
                <Ionicons name="diamond" size={16} color="#FFD700" />
                <Text style={[styles.coinText, { color: isDark ? '#ccc' : '#666' }]}>{plan.coins} coins</Text>
              </View>
            </View>
            
            <View style={[
              styles.selectButton,
              {
                backgroundColor: selectedPlan?.id === plan.id ? Colors.light.primary : (isDark ? '#555' : '#f0f0f0')
              }
            ]}>
              <Text style={[
                styles.selectButtonText,
                { color: selectedPlan?.id === plan.id ? 'white' : (isDark ? '#ccc' : '#666') }
              ]}>
                {selectedPlan?.id === plan.id ? 'Selected' : 'Select'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      
      {selectedPlan && (
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceedToPayment}>
          <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderPaymentSection = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Choose Payment Method</Text>
      
      {(['UPI', 'Card', 'Wallet'] as PaymentMethod[]).map((method) => (
        <TouchableOpacity
          key={method}
          style={[
            styles.paymentOption,
            { backgroundColor: isDark ? '#333' : 'white' }
          ]}
          onPress={() => setPaymentMethod(method)}
        >
          <View style={styles.radioButton}>
            <View style={[
              styles.radioInner,
              { backgroundColor: paymentMethod === method ? Colors.light.primary : 'transparent' }
            ]} />
          </View>
          <Text style={[styles.paymentText, { color: isDark ? 'white' : '#333' }]}>{method}</Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity 
        style={[styles.proceedButton, { opacity: loading ? 0.7 : 1 }]} 
        onPress={handleCreateOrder}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.proceedButtonText}>Create Order</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderOrderSection = () => (
    <View style={styles.section}>
      <View style={styles.orderSuccess}>
        <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
        <Text style={[styles.orderTitle, { color: isDark ? 'white' : '#333' }]}>Order Created!</Text>
        
        <View style={styles.orderDetails}>
          <Text style={[styles.orderText, { color: isDark ? '#ccc' : '#666' }]}>Amount: ₹{selectedPlan?.price}</Text>
          <Text style={[styles.orderText, { color: isDark ? '#ccc' : '#666' }]}>Order ID: {orderId}</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.proceedButton, { opacity: loading ? 0.7 : 1 }]} 
          onPress={handleCompletePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.proceedButtonText}>Complete Payment</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCompleteSection = () => (
    <View style={styles.section}>
      <View style={styles.paymentResult}>
        <Ionicons 
          name={paymentSuccess ? "checkmark-circle" : "close-circle"} 
          size={64} 
          color={paymentSuccess ? "#4CAF50" : "#f44336"} 
        />
        <Text style={[styles.resultTitle, { color: isDark ? 'white' : '#333' }]}>
          {paymentSuccess ? 'Payment Successful!' : 'Payment Failed'}
        </Text>
        
        {paymentSuccess && (
          <Text style={[styles.coinsAdded, { color: '#4CAF50' }]}>Coins Added: {selectedPlan?.coins}</Text>
        )}
        
        <TouchableOpacity 
          style={styles.proceedButton} 
          onPress={() => paymentSuccess ? setCurrentStep('history') : setCurrentStep('order')}
        >
          <Text style={styles.proceedButtonText}>
            {paymentSuccess ? 'Go to My Wallet' : 'Retry Payment'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHistorySection = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedHistory = rechargeHistory.slice(startIndex, endIndex);
    const totalPages = Math.ceil(rechargeHistory.length / pageSize);

    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Recharge History</Text>
        
        <View style={[styles.historyHeader, { backgroundColor: isDark ? '#444' : '#f0f0f0' }]}>
          <Text style={[styles.historyHeaderText, { color: isDark ? 'white' : '#333' }]}>Date</Text>
          <Text style={[styles.historyHeaderText, { color: isDark ? 'white' : '#333' }]}>Plan</Text>
          <Text style={[styles.historyHeaderText, { color: isDark ? 'white' : '#333' }]}>Amount</Text>
          <Text style={[styles.historyHeaderText, { color: isDark ? 'white' : '#333' }]}>Status</Text>
          <Text style={[styles.historyHeaderText, { color: isDark ? 'white' : '#333' }]}>Coins</Text>
        </View>
        
        {paginatedHistory.map((item) => (
          <View key={item.id} style={[styles.historyRow, { backgroundColor: isDark ? '#333' : 'white' }]}>
            <Text style={[styles.historyText, { color: isDark ? '#ccc' : '#666' }]}>{item.date}</Text>
            <Text style={[styles.historyText, { color: isDark ? '#ccc' : '#666' }]}>{item.planName}</Text>
            <Text style={[styles.historyText, { color: isDark ? '#ccc' : '#666' }]}>₹{item.amount}</Text>
            <Text style={[
              styles.historyText,
              { color: item.status === 'Success' ? '#4CAF50' : '#f44336' }
            ]}>
              {item.status}
            </Text>
            <Text style={[styles.historyText, { color: isDark ? '#ccc' : '#666' }]}>{item.coinsAdded}</Text>
          </View>
        ))}
        
        <View style={styles.pagination}>
          <TouchableOpacity 
            style={[styles.pageButton, { opacity: currentPage === 1 ? 0.5 : 1 }]}
            onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <Text style={styles.pageButtonText}>Previous</Text>
          </TouchableOpacity>
          
          <Text style={[styles.pageInfo, { color: isDark ? 'white' : '#333' }]}>
            Page {currentPage} of {totalPages}
          </Text>
          
          <TouchableOpacity 
            style={[styles.pageButton, { opacity: currentPage === totalPages ? 0.5 : 1 }]}
            onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.pageButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'plans': return renderPlansSection();
      case 'payment': return renderPaymentSection();
      case 'order': return renderOrderSection();
      case 'complete': return renderCompleteSection();
      case 'history': return renderHistorySection();
      default: return renderPlansSection();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#1a1a1a' : 'white' }]}>
        <TouchableOpacity onPress={() => {
          if (currentStep === 'plans') {
            router.back();
          } else {
            setCurrentStep('plans');
            setSelectedPlan(null);
            setOrderId(null);
          }
        }}>
          <Ionicons name="chevron-back" size={24} color={isDark ? 'white' : '#333'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? 'white' : '#333' }]}>Recharge</Text>
        <TouchableOpacity onPress={() => setCurrentStep('history')}>
          <Ionicons name="time" size={24} color={isDark ? 'white' : '#333'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  planCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  planBenefits: {
    flex: 1,
    alignItems: 'center',
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinText: {
    marginLeft: 6,
    fontSize: 14,
  },
  selectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  proceedButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  paymentText: {
    fontSize: 16,
  },
  orderSuccess: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  orderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
  },
  orderDetails: {
    alignItems: 'center',
    marginBottom: 24,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 8,
  },
  paymentResult: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
  },
  coinsAdded: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
  },
  historyHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  historyHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  historyRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  historyText: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  pageButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pageButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  pageInfo: {
    fontSize: 14,
  },
});