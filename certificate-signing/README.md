In this example, we'll create two different private keys: one for the CSR and certificate generation (signing_key.pem), and another one for which we want to have the public key signed (key_to_sign.pem). We'll generate a self-signed certificate with the public key from key_to_sign.pem signed by the private key in signing_key.pem.

1. Generate the two private keys (RSA 2048-bit):

```bash
openssl genpkey -algorithm RSA -out signing_key.pem -pkeyopt rsa_keygen_bits:2048
openssl genpkey -algorithm RSA -out key_to_sign.pem -pkeyopt rsa_keygen_bits:2048
```

2. Extract the public key from the key_to_sign.pem:

```bash
openssl rsa -pubout -in key_to_sign.pem -out public_key_to_sign.pem
```

3. reate a configuration file certificate.conf to include the public key you want to sign in the certificate's subjectPublicKeyInfo field:

```bash
// see the certifcate.conf file in the repository
```

4. Create a Certificate Signing Request (CSR) using the signing_key.pem and openssl.conf:

```bash
openssl req -new -key signing_key.pem -out csr.pem -config openssl.conf
```

5. Create a self-signed certificate using the CSR and the signing_key.pem:

```bash
openssl x509 -req -days 365 -in csr.pem -signkey signing_key.pem -out certificate.pem -extensions req_ext -extfile certificate.conf
```

Now you have a self-signed certificate (certificate.pem) with the public key from key_to_sign.pem signed by the private key in signing_key.pem.

