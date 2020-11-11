package com.pb.nomorewait.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pb.nomorewait.web.rest.TestUtil;

public class CommerceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Commerce.class);
        Commerce commerce1 = new Commerce();
        commerce1.setId(1L);
        Commerce commerce2 = new Commerce();
        commerce2.setId(commerce1.getId());
        assertThat(commerce1).isEqualTo(commerce2);
        commerce2.setId(2L);
        assertThat(commerce1).isNotEqualTo(commerce2);
        commerce1.setId(null);
        assertThat(commerce1).isNotEqualTo(commerce2);
    }
}
