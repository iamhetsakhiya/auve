import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  B2BEnquiry, 
  QuoteRequest, 
  SampleRequest, 
  TradeAccount, 
  ProductItem, 
  DistributorApplication, 
  EnquiryStatus 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ENQUIRIES, 
  INITIAL_QUOTES, 
  INITIAL_SAMPLES, 
  INITIAL_ACCOUNTS 
} from '../data/mockData';

export type PageView = 
  | 'home'
  | 'products'
  | 'hotels'
  | 'restaurants'
  | 'wellness'
  | 'philosophy'
  | 'about'
  | 'distribution'
  | 'enquire'
  | 'quote'
  | 'sample'
  | 'support'
  | 'account'
  | 'admin';

interface ToastInfo {
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  isNavOpen: boolean;
  setIsNavOpen: (open: boolean) => void;
  
  // Products
  products: ProductItem[];
  selectedProductForAction: ProductItem | null;
  setSelectedProductForAction: (product: ProductItem | null) => void;
  updateProduct: (product: ProductItem) => void;
  
  // Inquiries
  enquiries: B2BEnquiry[];
  addEnquiry: (enquiry: Omit<B2BEnquiry, 'id' | 'referenceNumber' | 'status' | 'createdAt'>) => string;
  updateEnquiryStatus: (id: string, status: EnquiryStatus, notes?: string) => void;
  deleteEnquiry: (id: string) => void;
  
  // Quotes
  quotes: QuoteRequest[];
  addQuote: (quote: Omit<QuoteRequest, 'id' | 'referenceNumber' | 'status' | 'createdAt'>) => string;
  updateQuoteStatus: (id: string, status: EnquiryStatus, quotedAmount?: string, notes?: string) => void;
  
  // Samples
  samples: SampleRequest[];
  addSample: (sample: Omit<SampleRequest, 'id' | 'referenceNumber' | 'status' | 'createdAt'>) => string;
  updateSampleStatus: (id: string, status: SampleRequest['status'], trackingNumber?: string) => void;
  
  // Trade Accounts
  accounts: TradeAccount[];
  currentAccount: TradeAccount | null;
  registerAccount: (account: Omit<TradeAccount, 'id' | 'status' | 'createdAt'>) => void;
  updateAccountStatus: (id: string, status: TradeAccount['status']) => void;
  loginAccount: (email: string) => boolean;
  logoutAccount: () => void;

  // Secret Admin Authentication
  isAdminAuthenticated: boolean;
  authenticateAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  
  // Toast
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPageState] = useState<PageView>('home');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedProductForAction, setSelectedProductForAction] = useState<ProductItem | null>(null);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  // Set page with scroll to top
  const setCurrentPage = (page: PageView) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsNavOpen(false);
  };

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Products
  const [products, setProducts] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('auve_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Enquiries
  const [enquiries, setEnquiries] = useState<B2BEnquiry[]>(() => {
    const saved = localStorage.getItem('auve_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  // Quotes
  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('auve_quotes');
    return saved ? JSON.parse(saved) : INITIAL_QUOTES;
  });

  // Samples
  const [samples, setSamples] = useState<SampleRequest[]>(() => {
    const saved = localStorage.getItem('auve_samples');
    return saved ? JSON.parse(saved) : INITIAL_SAMPLES;
  });

  // Accounts
  const [accounts, setAccounts] = useState<TradeAccount[]>(() => {
    const saved = localStorage.getItem('auve_accounts');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
  });

  const [currentAccount, setCurrentAccount] = useState<TradeAccount | null>(() => {
    const saved = localStorage.getItem('auve_current_account');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS[0]; // Logged in with Béatrice Moreau by default for easy inspection
  });

  // Secret Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('auve_admin_auth') === 'true';
  });

  const authenticateAdmin = (passcode: string): boolean => {
    // Executive Security Master Passcode
    if (passcode.trim().toLowerCase() === 'auve2026' || passcode.trim().toUpperCase() === 'AUVE-2026') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('auve_admin_auth', 'true');
      showToast('AUVE Executive Cockpit Unlocked', 'success');
      return true;
    }
    showToast('Invalid Security Passcode', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('auve_admin_auth');
    setCurrentPage('home');
    window.location.hash = '';
    showToast('Admin Cockpit Session Locked', 'info');
  };

  // Dedicated URL Hash routing (#admin) only
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentPageState('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsNavOpen(false);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    return () => {
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('auve_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('auve_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('auve_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('auve_samples', JSON.stringify(samples));
  }, [samples]);

  useEffect(() => {
    localStorage.setItem('auve_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (currentAccount) {
      localStorage.setItem('auve_current_account', JSON.stringify(currentAccount));
    } else {
      localStorage.removeItem('auve_current_account');
    }
  }, [currentAccount]);

  // Actions
  const addEnquiry = (enquiryData: Omit<B2BEnquiry, 'id' | 'referenceNumber' | 'status' | 'createdAt'>): string => {
    const refNum = `AUVE-ENQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnquiry: B2BEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      referenceNumber: refNum,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    showToast(`Enquiry received. Reference #${refNum}`, 'success');
    return refNum;
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus, notes?: string) => {
    setEnquiries(prev => prev.map(item => item.id === id ? { ...item, status, ...(notes !== undefined ? { notes } : {}) } : item));
    showToast(`Enquiry ${status}`, 'info');
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(item => item.id !== id));
    showToast('Enquiry record deleted', 'info');
  };

  const addQuote = (quoteData: Omit<QuoteRequest, 'id' | 'referenceNumber' | 'status' | 'createdAt'>): string => {
    const refNum = `AUVE-QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `quote-${Date.now()}`,
      referenceNumber: refNum,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setQuotes(prev => [newQuote, ...prev]);
    showToast(`Quotation request submitted. Reference #${refNum}`, 'success');
    return refNum;
  };

  const updateQuoteStatus = (id: string, status: EnquiryStatus, quotedAmount?: string, notes?: string) => {
    setQuotes(prev => prev.map(q => q.id === id ? { 
      ...q, 
      status, 
      ...(quotedAmount !== undefined ? { quotedAmount } : {}),
      ...(notes !== undefined ? { notes } : {})
    } : q));
    showToast(`Quote updated to ${status}`, 'info');
  };

  const addSample = (sampleData: Omit<SampleRequest, 'id' | 'referenceNumber' | 'status' | 'createdAt'>): string => {
    const refNum = `AUVE-SMP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSample: SampleRequest = {
      ...sampleData,
      id: `smp-${Date.now()}`,
      referenceNumber: refNum,
      status: 'Pending Review',
      createdAt: new Date().toISOString()
    };
    setSamples(prev => [newSample, ...prev]);
    showToast(`Sample tasting request submitted. Reference #${refNum}`, 'success');
    return refNum;
  };

  const updateSampleStatus = (id: string, status: SampleRequest['status'], trackingNumber?: string) => {
    setSamples(prev => prev.map(s => s.id === id ? {
      ...s,
      status,
      ...(trackingNumber !== undefined ? { trackingNumber } : {})
    } : s));
    showToast(`Sample status: ${status}`, 'info');
  };

  const registerAccount = (accData: Omit<TradeAccount, 'id' | 'status' | 'createdAt'>) => {
    const newAcc: TradeAccount = {
      ...accData,
      id: `acc-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setAccounts(prev => [newAcc, ...prev]);
    showToast('Business registration received. Pending AUVE trade review.', 'success');
  };

  const updateAccountStatus = (id: string, status: TradeAccount['status']) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    showToast(`Account set to ${status}`, 'info');
  };

  const loginAccount = (email: string): boolean => {
    const found = accounts.find(a => a.officialBusinessEmail.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentAccount(found);
      showToast(`Welcome back, ${found.contactPerson}`, 'success');
      return true;
    }
    showToast('Business account not found. Please register.', 'error');
    return false;
  };

  const logoutAccount = () => {
    setCurrentAccount(null);
    showToast('Signed out of Trade Account', 'info');
  };

  const updateProduct = (updated: ProductItem) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast('Product specifications updated', 'success');
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      isNavOpen,
      setIsNavOpen,
      products,
      selectedProductForAction,
      setSelectedProductForAction,
      updateProduct,
      enquiries,
      addEnquiry,
      updateEnquiryStatus,
      deleteEnquiry,
      quotes,
      addQuote,
      updateQuoteStatus,
      samples,
      addSample,
      updateSampleStatus,
      accounts,
      currentAccount,
      registerAccount,
      updateAccountStatus,
      loginAccount,
      logoutAccount,
      isAdminAuthenticated,
      authenticateAdmin,
      logoutAdmin,
      toast,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
