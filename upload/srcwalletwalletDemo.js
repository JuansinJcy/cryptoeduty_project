export function createDemoWallet() {
  const seed = crypto.getRandomValues(new Uint8Array(16))
  const hex = Array.from(seed).map(b => b.toString(16).padStart(2, '0')).join('')
  return {
    address: `EDU-${hex.slice(0, 12).toUpperCase()}`,
    privateKey: `PRV-${hex.slice(12, 24).toUpperCase()}`,
    balance: (Math.random() * 3).toFixed(4),
    network: 'Demo Learning Network'
  }
}

export function mockTransfer(amount, destination) {
  return {
    status: 'success',
    message: `Operación educativa preparada: ${amount} unidades ficticias hacia ${destination}.`
  }
}