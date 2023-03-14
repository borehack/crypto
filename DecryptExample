import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;

import javax.crypto.Cipher;
import javax.crypto.spec.OAEPParameterSpec;
import javax.crypto.spec.PSource;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.MGF1ParameterSpec;
import java.security.spec.PKCS8EncodedKeySpec;

public class DecryptExample {

    public static void main(String... args) throws Exception {
        String dataSHA1 = "272ee20041044951b4d52d5d8c2d68e49d8be5ce0b1d074322ce46cc33739e8b558ed5bfdd86227d105cae5062eb77cea9a3c240d036a6b2fe8d196cf9a0d93ee93830d937b4646b557c174f482f483f53406d8e28d2ba17de2560727044c965177b239f5bce72019309bcd2d8f7a8025d6eef54d89040315f118ca28014b9c5c11512ab3a2faf0715bdfc4bccb4cf559f96b035c28bacc13dfdcbdd4f35bd55d0f49c052cf7e9e828a7d51b10a7355f0e9493a9f2b862ec088764964cffa21b81a08dca4334c92831e0e67c2667cc05cca9361299dc394a13be0626599d4cbf894ea3098d4f6337cbbd6690842caef711aa162a4c4be1db24a56b0aef16b036";
        String dataSHA2 = "397e682c0d3371a6b8413cb7f8ee8c2ac9fdc40ef3bc4680d27cc98ae88d24543e5b23388a80eefb818bb064705e4006681de8352e2631488c867edfc70a0e507c2551cdf8414ecfc20269124d288f35e6d5b779fe759f7e1970d90f71e21aa56d7ccf53cab41ae7315cb0f0011096f1367e3c5d41abbde88b513e45291405978785fcbfbb66641257b65939d071de7a4de3ec8112fcd996913f71f23ce7eb5567b7797f1ff1b57282b7b9f2c248d992e974bc5650a525522e6604de679820645c0a4b61332d0422a3e68e3f17a20c7c84870dffff4875f634ca6c1dafab897479378f0154ed19178882bf398d113c63faab60d10728a8e96c87257c65713fa2";

        System.out.println("SHA1  : " + new DecryptExample().decryptSAH1(dataSHA1));
        System.out.println("SHA256: " + new DecryptExample().decryptSAH256(dataSHA2));
    }

    public String decryptSAH1(final String data) throws Exception {
        Cipher decryptCipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-1AndMGF1Padding");

        PrivateKey privateKey = getPrivateKey();

        decryptCipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] bytes = decryptCipher.doFinal(Hex.decodeHex(data));

        return new String(bytes, StandardCharsets.UTF_8);
    }

    public String decryptSAH256(final String data) throws Exception {
        // Reference: https://stackoverflow.com/questions/55525628/rsa-encryption-with-oaep-between-java-and-javascript
        Cipher decryptCipher = Cipher.getInstance("RSA/ECB/OAEPPadding");
        OAEPParameterSpec oaepParams = new OAEPParameterSpec("SHA-256", "MGF1", new MGF1ParameterSpec("SHA-256"), PSource.PSpecified.DEFAULT);

        PrivateKey privateKey = getPrivateKey();

        decryptCipher.init(Cipher.DECRYPT_MODE, privateKey, oaepParams);
        byte[] bytes = decryptCipher.doFinal(Hex.decodeHex(data));

        return new String(bytes, StandardCharsets.UTF_8);
    }

    public PrivateKey getPrivateKey() throws Exception {
        byte[] bytesKey = Base64.decodeBase64(
                Files.readString(Path.of("TEST-privatekey.pem"))
                        .replace("-----BEGIN PRIVATE KEY-----", "")
                        .replace("-----END PRIVATE KEY-----", "")
                        .trim()
        );

        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(bytesKey);
        return keyFactory.generatePrivate(keySpec);
    }
}
