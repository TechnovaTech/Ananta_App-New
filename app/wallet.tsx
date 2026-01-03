import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '@/constants/theme';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export default function WalletScreen() {
  const { isDark } = useTheme();
  const [balance] = useState(2450);
  const [transactions] = useState<Transaction[]>([
    { id: '1', type: 'credit', amount: 600, description: 'Gold Plan Purchase', date: '2025-11-29', status: 'completed' },
    { id: '2', type: 'debit', amount: 50, description: 'Gift Sent', date: '2025-11-28', status: 'completed' },
    { id: '3', type: 'credit', amount: 250, description: 'Silver Plan Purchase', date: '2025-11-27', status: 'completed' },
    { id: '4', type: 'debit', amount: 100, description: 'Live Stream Boost', date: '2025-11-26', status: 'completed' },
    { id: '5', type: 'credit', amount: 1500, description: 'Platinum Plan Purchase', date: '2025-11-25', status: 'completed' },
    { id: '6', type: 'debit', amount: 25, description: 'Super Chat', date: '2025-11-24', status: 'completed' },
  ]);

  const getTransactionIcon = (type: string, status: string) => {
    if (status === 'pending') return 'time';
    if (status === 'failed') return 'close-circle';
    return type === 'credit' ? 'add-circle' : 'remove-circle';
  };

  const getTransactionColor = (type: string, status: string) => {
    if (status === 'pending') return '#FF9800';
    if (status === 'failed') return '#f44336';
    return type === 'credit' ? '#4CAF50' : '#f44336';
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? '#1a1a1a' : 'white' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={isDark ? 'white' : '#333'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? 'white' : '#333' }]}>My Wallet</Text>
        <TouchableOpacity onPress={() => router.push('/recharge')}>
          <Ionicons name="add" size={24} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: Colors.light.primary }]}>
          <View style={styles.balanceHeader}>
            <Ionicons name="diamond" size={32} color="white" />
            <Text style={styles.balanceLabel}>Total Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>{balance.toLocaleString()} Coins</Text>
          <Text style={styles.balanceSubtext}>≈ ₹{(balance * 0.5).toLocaleString()}</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: isDark ? '#333' : 'white' }]}
            onPress={() => router.push('/recharge')}
          >
            <Ionicons name="add-circle" size={24} color="#4CAF50" />
            <Text style={[styles.actionText, { color: isDark ? 'white' : '#333' }]}>Recharge</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: isDark ? '#333' : 'white' }]}
            onPress={() => {/* Add send coins functionality */}}
          >
            <Ionicons name="send" size={24} color="#2196F3" />
            <Text style={[styles.actionText, { color: isDark ? 'white' : '#333' }]}>Send</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: isDark ? '#333' : 'white' }]}
            onPress={() => {/* Add withdraw functionality */}}
          >
            <Ionicons name="card" size={24} color="#FF9800" />
            <Text style={[styles.actionText, { color: isDark ? 'white' : '#333' }]}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: Colors.light.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {transactions.map((transaction) => (
            <View key={transaction.id} style={[styles.transactionItem, { backgroundColor: isDark ? '#333' : 'white' }]}>
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIcon, { backgroundColor: getTransactionColor(transaction.type, transaction.status) + '20' }]}>
                  <Ionicons 
                    name={getTransactionIcon(transaction.type, transaction.status)} 
                    size={20} 
                    color={getTransactionColor(transaction.type, transaction.status)} 
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={[styles.transactionDescription, { color: isDark ? 'white' : '#333' }]}>
                    {transaction.description}
                  </Text>
                  <Text style={[styles.transactionDate, { color: isDark ? '#888' : '#666' }]}>
                    {transaction.date}
                  </Text>
                </View>
              </View>
              
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: getTransactionColor(transaction.type, transaction.status) }
                ]}>
                  {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                </Text>
                <Text style={[styles.transactionStatus, { color: isDark ? '#888' : '#666' }]}>
                  {transaction.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Wallet Stats */}
        <View style={[styles.statsCard, { backgroundColor: isDark ? '#333' : 'white' }]}>
          <Text style={[styles.statsTitle, { color: isDark ? 'white' : '#333' }]}>This Month</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#4CAF50' }]}>+1,850</Text>
              <Text style={[styles.statLabel, { color: isDark ? '#888' : '#666' }]}>Earned</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#f44336' }]}>-175</Text>
              <Text style={[styles.statLabel, { color: isDark ? '#888' : '#666' }]}>Spent</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors.light.primary }]}>12</Text>
              <Text style={[styles.statLabel, { color: isDark ? '#888' : '#666' }]}>Transactions</Text>
            </View>
          </View>
        </View>
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
  balanceCard: {
    borderRadius: 16,
    padding: 24,
    marginVertical: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceLabel: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    opacity: 0.9,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  balanceSubtext: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  transactionStatus: {
    fontSize: 10,
    textTransform: 'capitalize',
  },
  statsCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
});